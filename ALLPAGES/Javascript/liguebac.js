/* ============================================================
   LIGUE BAC — logique front-end
   Attend 2 routes API côté backend (voir league-backend-reference.js) :

   GET /api/league/current-week
     -> { chapitreTitre, joursRestants, participants: [
            { id, nom, points, rang }
         ], moiId }

   GET /api/league/laureat-du-mois
     -> { nom, points, mois }
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    chargerSemaineActuelle();
    chargerLaureatDuMois();
});

async function chargerSemaineActuelle() {
    try {
        const reponse = await fetch("/api/league/current-week", {
            headers: { "Authorization": "Bearer " + (localStorage.getItem("token") || "") }
        });
        const data = await reponse.json();

        document.getElementById("chapitreSemaine").textContent = data.chapitreTitre || "Chapitre à venir";
        document.getElementById("joursRestants").textContent =
            data.joursRestants > 0
                ? `Il reste ${data.joursRestants} jour${data.joursRestants > 1 ? "s" : ""} — du lundi au vendredi`
                : "La semaine est terminée, les résultats arrivent bientôt";

        afficherPodiumEtClassement(data.participants || [], data.moiId);
    } catch (erreur) {
        console.error("Erreur chargement ligue bac :", erreur);
        document.getElementById("chapitreSemaine").textContent = "Impossible de charger la ligue pour le moment";
    }
}

function afficherPodiumEtClassement(participants, moiId) {
    const podiumEl = document.getElementById("podium");
    const listeEl = document.getElementById("listeClassement");
    const videEl = document.getElementById("classementVide");

    if (!participants.length) {
        podiumEl.innerHTML = "";
        listeEl.innerHTML = "";
        videEl.style.display = "block";
        return;
    }
    videEl.style.display = "none";

    // --- Podium : top 3 ---
    const top3 = participants.slice(0, 3);
    const positions = ["deuxieme", "premier", "troisieme"]; // ordre visuel : 2e, 1er, 3e
    const ordreAffichage = [top3[1], top3[0], top3[2]];

    podiumEl.innerHTML = ordreAffichage
        .map((p, i) => {
            if (!p) return "";
            const medailles = ["🥈", "🥇", "🥉"];
            return `
                <div class="podium-carte ${positions[i]}">
                    <div class="podium-medaille">${medailles[i]}</div>
                    <div class="podium-avatar">${initiales(p.nom)}</div>
                    <div class="podium-nom">${p.nom}</div>
                    <div class="podium-points">${p.points} XP</div>
                </div>`;
        })
        .join("");

    // --- Classement complet (uniquement participants) ---
    listeEl.innerHTML = participants
        .map((p) => {
            const estMoi = moiId && p.id === moiId;
            return `
                <li class="ligne-classement ${estMoi ? "moi" : ""}">
                    <span class="ligne-rang">${p.rang}</span>
                    <span class="ligne-avatar">${initiales(p.nom)}</span>
                    <span class="ligne-nom">${p.nom}${estMoi ? " (toi)" : ""}</span>
                    <span class="ligne-points">${p.points} XP</span>
                </li>`;
        })
        .join("");
}

async function chargerLaureatDuMois() {
    try {
        const reponse = await fetch("/api/league/laureat-du-mois");
        const data = await reponse.json();

        if (!data || !data.nom) {
            document.getElementById("laureatNom").textContent = "Pas encore de lauréat";
            document.getElementById("laureatDetail").textContent = "Reviens à la fin du mois";
            return;
        }
        document.getElementById("laureatNom").textContent = data.nom;
        document.getElementById("laureatDetail").textContent = `${data.points} XP cumulés en ${data.mois}`;
    } catch (erreur) {
        console.error("Erreur chargement lauréat du mois :", erreur);
    }
}

function initiales(nomComplet) {
    return nomComplet
        .split(" ")
        .map((mot) => mot[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}