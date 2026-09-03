/* ============================================================
   SEED — Chapitres hebdomadaires de la Ligue bac (27 semaines)
   ============================================================
   À donner à Copilot pour qu'il l'adapte à ta vraie connexion
   MongoDB et à ton modèle WeeklyChapter (voir league-backend-reference.js).

   Utilise la même fonction obtenirWeekKey() que le backend de la
   Ligue bac, pour être certain que les weekKey correspondent
   exactement à ceux calculés en temps réel par l'API.

   Usage prévu : `node seed-weekly-chapters.js` une seule fois,
   après avoir branché la connexion à la base de données.
   ============================================================ */

function obtenirWeekKey(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const jourSemaine = (d.getUTCDay() + 6) % 7; // lundi = 0
    d.setUTCDate(d.getUTCDate() - jourSemaine + 3);
    const premierJanvier = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const numeroSemaine = Math.ceil(((d - premierJanvier) / 86400000 + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(numeroSemaine).padStart(2, "0")}`;
}

// Chaque entrée = le lundi de la semaine de championnat + le titre du chapitre.
// Les vacances (Noël, Carnaval, Semaine sainte) sont simplement absentes de la liste.
const chapitresHebdo = [
    ["2026-09-07", "Sténio Vincent"],
    ["2026-09-14", "Élie Lescot"],
    ["2026-09-21", "Dumarsais Estimé"],
    ["2026-09-28", "Paul Eugène Magloire"],
    ["2026-10-05", "Contexte transversal : clientèle lescotique, Bureau du Travail, IDH, Schengen"],
    ["2026-10-12", "La crise de 1929 et l'enchaînement vers la Seconde Guerre mondiale"],
    ["2026-10-19", "L'humiliation du traité de Versailles"],
    ["2026-10-26", "L'échec de la SDN"],
    ["2026-11-02", "Bilan de la Seconde Guerre mondiale et bipolarisation du monde"],
    ["2026-11-09", "Bilan de la Première Guerre mondiale"],
    ["2026-11-16", "Domination économique, culturelle et militaire des États-Unis"],
    ["2026-11-23", "Le Plan Marshall dans la Guerre froide"],
    ["2026-11-30", "Influence des États-Unis sur Haïti depuis l'Occupation"],
    ["2026-12-07", "Influence de l'Union européenne sur Haïti depuis sa création"],
    ["2026-12-14", "Influence des États-Unis sur le monde depuis la Première Guerre"],
    // Vacances de Noël : 21 et 28 décembre 2026 — pas de chapitre
    ["2027-01-04", "Influence de l'Union européenne sur le monde depuis sa création"],
    ["2027-01-11", "Les critères de la zone euro"],
    ["2027-01-18", "La mondialisation et ses acteurs"],
    ["2027-01-25", "L'essor des métropoles globales et le paradoxe des bidonvilles"],
    ["2027-02-01", "La triade économique et les 80% du PIB mondial"],
    // Carnaval : 8 février 2027 — pas de chapitre
    ["2027-02-15", "L'essor économique des États-Unis"],
    ["2027-02-22", "L'essor économique de l'Union européenne"],
    ["2027-03-01", "L'essor économique du Japon"],
    ["2027-03-08", "Les faiblesses des États-Unis"],
    ["2027-03-15", "Les faiblesses de l'Union européenne"],
    // Semaine sainte : 22 mars 2027 — pas de chapitre
    ["2027-03-29", "Les faiblesses du Japon"],
    ["2027-04-05", "Les crises économiques depuis la Première Guerre mondiale"],
];

async function lancerSeed(WeeklyChapterModel) {
    for (const [dateStr, titre] of chapitresHebdo) {
        const lundi = new Date(dateStr + "T00:00:00Z");
        const weekKey = obtenirWeekKey(lundi);

        await WeeklyChapterModel.findOneAndUpdate(
            { weekKey },
            { titre },
            { upsert: true }
        );
        console.log(`OK — ${weekKey} : ${titre}`);
    }
    console.log("Seed terminé : 27 chapitres programmés.");
}

module.exports = { lancerSeed, chapitresHebdo, obtenirWeekKey };

/* ------------------------------------------------------------
   Exemple d'appel une fois branché à ta connexion MongoDB :

   const mongoose = require("mongoose");
   const WeeklyChapter = require("./models/WeeklyChapter");
   const { lancerSeed } = require("./seed-weekly-chapters");

   mongoose.connect(process.env.MONGO_URI).then(async () => {
       await lancerSeed(WeeklyChapter);
       process.exit(0);
   });
------------------------------------------------------------ */