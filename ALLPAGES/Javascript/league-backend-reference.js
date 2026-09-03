/* ============================================================
   LIGUE BAC — RÉFÉRENCE BACKEND (Node.js + Express + MongoDB/Mongoose)
   ============================================================
   Ceci n'est PAS un fichier à coller tel quel dans ton projet —
   c'est une référence à donner à Copilot pour qu'il branche cette
   logique sur ton server.js / tes modèles / tes routes existants,
   sans changer ton système d'authentification par token actuel.

   LOGIQUE :
   - Une semaine de championnat = du lundi 00h00 au vendredi 23h59
     (heure de Port-au-Prince, America/Port-au-Prince)
   - Pas de "reset" destructif : chaque tentative de quiz est stockée
     avec un "weekKey" (ex. "2026-W36"). Le classement affiché est un
     simple filtre sur le weekKey actuel — rien n'est jamais effacé,
     donc l'historique reste disponible pour le lauréat du mois.
   - "Participant" = un utilisateur qui a au moins 1 XP sur le
     weekKey actuel. Les comptes sans activité n'apparaissent jamais.
   - Lauréat du mois = XP cumulés sur tous les weekKey du mois en cours.
   ============================================================ */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { requireAuth } = require("../middleware/auth"); // adapte au nom réel de ton middleware existant

/* ------------------------------------------------------------
   MODÈLE : LeagueEntry
   Une entrée par (utilisateur, semaine). On additionne les points
   à chaque quiz réussi plutôt que de créer une ligne par quiz,
   pour garder le classement rapide à lire.
------------------------------------------------------------ */
const leagueEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    weekKey: { type: String, required: true },   // ex: "2026-W36"
    monthKey: { type: String, required: true },  // ex: "2026-09"
    points: { type: Number, default: 0 },
    lastActivityAt: { type: Date, default: Date.now },
});
leagueEntrySchema.index({ userId: 1, weekKey: 1 }, { unique: true });

const LeagueEntry = mongoose.model("LeagueEntry", leagueEntrySchema);

/* ------------------------------------------------------------
   MODÈLE : WeeklyChapter
   Le chapitre affiché en haut de la page, changé à la main
   depuis l'admin (pas de calendrier automatique pour l'instant).
------------------------------------------------------------ */
const weeklyChapterSchema = new mongoose.Schema({
    weekKey: { type: String, required: true, unique: true },
    titre: { type: String, required: true }, // ex: "Sténio Vincent"
});
const WeeklyChapter = mongoose.model("WeeklyChapter", weeklyChapterSchema);

/* ------------------------------------------------------------
   UTILITAIRES DATE
------------------------------------------------------------ */
function obtenirWeekKey(date = new Date()) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const jourSemaine = (d.getUTCDay() + 6) % 7; // lundi = 0
    d.setUTCDate(d.getUTCDate() - jourSemaine + 3);
    const premierJanvier = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const numeroSemaine = Math.ceil(((d - premierJanvier) / 86400000 + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(numeroSemaine).padStart(2, "0")}`;
}

function obtenirMonthKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function joursRestantsCetteSemaine() {
    const aujourdHui = new Date().getDay(); // 0=dimanche ... 5=vendredi
    if (aujourdHui === 0 || aujourdHui === 6) return 0; // week-end, championnat terminé
    return 5 - aujourdHui + 1; // ex: mardi (2) -> il reste jusqu'à vendredi inclus
}

/* ------------------------------------------------------------
   ROUTE : ajouter des points quand un élève termine un quiz
   À appeler depuis ta route existante de correction de quiz,
   juste après avoir calculé le score.
   POST /api/league/xp   body: { points: 10 }
------------------------------------------------------------ */
router.post("/xp", requireAuth, async (req, res) => {
    const { points } = req.body;
    if (!points || points <= 0) return res.status(400).json({ erreur: "points invalide" });

    const maintenant = new Date();
    const weekKey = obtenirWeekKey(maintenant);
    const monthKey = obtenirMonthKey(maintenant);

    const entree = await LeagueEntry.findOneAndUpdate(
        { userId: req.user.id, weekKey },
        {
            $inc: { points },
            $set: { lastActivityAt: maintenant, monthKey },
        },
        { upsert: true, new: true }
    );

    res.json({ ok: true, totalSemaine: entree.points });
});

/* ------------------------------------------------------------
   ROUTE : classement de la semaine en cours
   GET /api/league/current-week
------------------------------------------------------------ */
router.get("/current-week", async (req, res) => {
    const weekKey = obtenirWeekKey();

    const chapitre = await WeeklyChapter.findOne({ weekKey });

    const entrees = await LeagueEntry.find({ weekKey, points: { $gt: 0 } })
        .sort({ points: -1 })
        .populate("userId", "nom"); // adapte "nom" au champ réel de ton modèle User

    const participants = entrees.map((e, index) => ({
        id: e.userId._id.toString(),
        nom: e.userId.nom,
        points: e.points,
        rang: index + 1,
    }));

    res.json({
        chapitreTitre: chapitre ? chapitre.titre : "Chapitre à définir",
        joursRestants: joursRestantsCetteSemaine(),
        participants,
        moiId: req.user ? req.user.id : null,
    });
});

/* ------------------------------------------------------------
   ROUTE : lauréat du mois
   GET /api/league/laureat-du-mois
------------------------------------------------------------ */
router.get("/laureat-du-mois", async (req, res) => {
    const monthKey = obtenirMonthKey();

    const resultats = await LeagueEntry.aggregate([
        { $match: { monthKey } },
        { $group: { _id: "$userId", totalPoints: { $sum: "$points" } } },
        { $sort: { totalPoints: -1 } },
        { $limit: 1 },
    ]);

    if (!resultats.length) return res.json({ nom: null });

    const utilisateur = await mongoose.model("User").findById(resultats[0]._id);

    res.json({
        nom: utilisateur ? utilisateur.nom : "Inconnu",
        points: resultats[0].totalPoints,
        mois: monthKey,
    });
});

/* ------------------------------------------------------------
   ROUTE ADMIN : définir le chapitre de la semaine
   POST /api/league/admin/chapitre   body: { titre: "Sténio Vincent" }
   (à protéger avec ton middleware admin existant, pas requireAuth seul)
------------------------------------------------------------ */
router.post("/admin/chapitre", requireAuth, async (req, res) => {
    // TODO: vérifier req.user.isAdmin avant de continuer
    const { titre } = req.body;
    const weekKey = obtenirWeekKey();

    await WeeklyChapter.findOneAndUpdate(
        { weekKey },
        { titre },
        { upsert: true }
    );

    res.json({ ok: true });
});

module.exports = router;