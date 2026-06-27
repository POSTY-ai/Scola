// ============================================================
// MENU DÉROULANT — ouverture/fermeture au clic
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const deroulant = document.querySelector(".deroulant >a");
    const menu = document.querySelector(".menuderoulant");

    deroulant.addEventListener("click", function (e) {
        e.preventDefault();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    window.addEventListener("click", function (e) {
        if (!deroulant.parentElement.contains(e.target)) {
            menu.style.display = "none";
        }
    });
});

// ============================================================
// TOGGLE NAV MOBILE — affiche/cache le menu sur mobile
// ============================================================
const menuIcon = document.querySelector('.fa-bars');
const navMenu = document.querySelector('nav ul');

menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// ============================================================
// RECHERCHE — filtre les cours selon la saisie de l'utilisateur
// ============================================================
const cours = [
    { titre: "La Première Guerre mondiale", lien: "../Pages/Premiereguerremondiale.html" },
    { titre: "La Deuxième Guerre mondiale", lien: "../Pages/Deuxiemeguerremondiale.html" },
    { titre: "Guerre froide", lien: "../Pages/guerrefroide.html" },
    { titre: "Ascension économique du Japon après la Seconde Guerre mondiale", lien: "../Pages/ascension japon.html" },
    { titre: "Ascension économique de l'Union européenne depuis sa création", lien: "../Pages/ascension ue.html" },
    { titre: "Ascension économique des États-Unis depuis la Première Guerre mondiale", lien: "../Pages/ascension usa.html" },
    { titre: "Contextes à connaître", lien: "../Pages/contexte.html" },
    { titre: "Crises économiques depuis la Première Guerre mondiale", lien: "../Pages/crise mondiale.html" },
    { titre: "krach boursier de 1929 /Crise de 1929", lien: "../Pages/crise1929.html" },
    { titre: "La domination des États-Unis", lien: "../Pages/domination americaine sur le plan economique.html" },
    { titre: "Influence des États-Unis sur le monde", lien: "../Pages/domination de l'USA sur le monde depuis la premiere guerre mondiale.html" },
    { titre: "Dumarsais Estimé (1946-1950)", lien: "../Pages/durmasais.html" },
    { titre: "Élie Lescot (1941-1946)", lien: "../Pages/elie.html" },
    { titre: "Faiblesses du Japon", lien: "../Pages/faiblesses japon.html" },
    { titre: "Faiblesses de l'Union européenne", lien: "../Pages/faiblesses ue.html" },
    { titre: "Faiblesses des États-Unis", lien: "../Pages/faiblesses usa.html" },
    { titre: "Influence de l'Union européenne sur le monde", lien: "../Pages/l'ue sur le monde.html" },
    { titre: "Paul Eugène Magloire (1950-1956)", lien: "../Pages/magloire.html" },
    { titre: "Essor des métropoles globales et paradoxe des bidonvilles", lien: "../Pages/metropoles et bidonvilles.html" },
    { titre: "La Mondialisation et ses acteurs", lien: "../Pages/mondialisation.html" },
    { titre: "Occupation américaine(1915-1934)", lien: "../Pages/occupation americaine sur Haiti.html" },
    { titre: "Le Plan Marshall : arme économique et politique", lien: "../Pages/plan marshall.html" },
    { titre: "Bilan de la Première Guerre mondiale", lien: "../Pages/premiere guerre mondiale.html" },
    { titre: "L'échec de la Société des Nations (SDN)", lien: "../Pages/SDN.html" },
    { titre: "La Seconde Guerre mondiale — bilan, bipolarisation et les alliances (OTAN / Pacte de Varsovie)", lien: "../Pages/seconde guerre mondiale.html" },
    { titre: "Sténio Vincent (1930-1941)", lien: "../Pages/stenio.html" },
    { titre: "L'humiliation due au Traité de Versailles (1919)", lien: "../Pages/traite de versailles.html" },
    { titre: "La Triade économique et sa domination mondiale", lien: "../Pages/triade.html" },
    { titre: "Influence de l'Union européenne sur Haïti", lien: "../Pages/union europeenne sur Haiti.html" },
    { titre: "Critères d'entrée dans la zone euro", lien: "../Pages/zoneeuro.html" }
];

const search1 = document.getElementById("searchbar");
const result1 = document.getElementById("result");

if (search1) {
    // Le "if" évite une erreur si searchbar n'existe pas sur certaines pages
    search1.addEventListener('input', () => {
        function enleverAccents(texte) {
            // normalize("NFD") décompose les lettres accentuées en caractère + accent
            // replace() supprime ensuite la partie accent
            return texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }

        const texte = enleverAccents(search1.value);
        search1.style.color = "black";
        result1.innerHTML = "";

        cours.forEach(coursItem => {
            if (enleverAccents(coursItem.titre).includes(texte)) {
                result1.innerHTML += `
                <a href="${coursItem.lien}">
                    📚 ${coursItem.titre}
                </a><br>
                `;
            }
        });
    });
}

// ============================================================
// SMOOTH SCROLL — défilement doux vers les ancres (#section)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

// ============================================================
// AUTHENTIFICATION — affiche les bons boutons selon connexion
// Vérifie si un token JWT existe dans le localStorage
// localStorage = mémoire du navigateur qui persiste après fermeture
// ============================================================
const token = localStorage.getItem("token");

const loginButton   = document.getElementById("logn-button");
const signupButton  = document.getElementById("signup-button");
const profileButton = document.getElementById("profile-button");
const logoutButton  = document.getElementById("logout-button");

if (token) {
    // ✅ Token trouvé = utilisateur connecté
    // On cache Connexion et Inscription, on montre Profil et Déconnexion
    if (loginButton)   loginButton.style.display   = "none";
    if (signupButton)  signupButton.style.display  = "none";
    if (profileButton) profileButton.style.display = "block";
    if (logoutButton)  logoutButton.style.display  = "block";
}
// ❌ Pas de token = pas connecté, les boutons restent dans leur état par défaut

// ============================================================
// DÉCONNEXION — supprime le token et redirige vers l'accueil
// ============================================================
function logout() {
    localStorage.removeItem("token"); // supprime le token du navigateur
    localStorage.removeItem("user");  // supprime les infos utilisateur
    window.location.href = "/";       // retourne à la page d'accueil
}

// ============================================================
// PROTECTION DU MENU DÉROULANT
// Si l'utilisateur clique sur un lien du menu sans être connecté,
// on annule la navigation et on affiche la modal d'accès restreint
// ============================================================
const lienMenu = document.querySelectorAll('.menuderoulant a');
// querySelectorAll = sélectionne TOUS les liens du menu
// Retourne une NodeList (liste de tous les éléments trouvés)

lienMenu.forEach((lien) => {
    // forEach = on applique la même logique à chaque lien du menu

    lien.addEventListener('click', (e) => {

        if (!token) {
            // ❌ Pas de token = pas connecté
            e.preventDefault();
            // preventDefault() = annule le comportement par défaut du lien
            // Sans ça, le navigateur changerait de page normalement

            ouvrirModal(); // affiche la fenêtre popup
        }
        // ✅ Token présent = connecté, le lien fonctionne normalement
    });
});

// ============================================================
// MODAL — fenêtre popup d'accès restreint
// ouvrirModal() est appelée quand un visiteur non connecté
// clique sur un lien du menu déroulant
// ============================================================
function ouvrirModal() {
    const modal = document.getElementById('modal-acces');
    if (modal) modal.style.display = 'flex';
    // flex = permet de centrer le contenu de la modal
}

function fermerModal() {
    const modal = document.getElementById('modal-acces');
    if (modal) modal.style.display = 'none';
}

// Fermer la modal en cliquant sur le fond sombre (en dehors de la fenêtre blanche)
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-acces');
    if (modal && e.target === modal) {
        // e.target = l'élément exact cliqué
        // Si c'est le fond sombre (pas la fenêtre intérieure), on ferme
        fermerModal();
    }
});
// ============================================================
// SYSTÈME PREMIUM FRONTEND — À COLLER À LA FIN DE project.js
// ============================================================
// Ce bloc gère côté navigateur :
// 1. Récupération du rôle depuis le backend
// 2. Affichage des cadenas sur le contenu bloqué
// 3. Modal d'upgrade quand un gratuit clique sur du contenu Pro
// 4. Vérification de limite quiz avant de lancer une partie
// ============================================================


// ============================================================
// RÉCUPÉRATION DU RÔLE UTILISATEUR
// Appelée au chargement de la page si l'utilisateur est connecté
// Stocke le rôle dans une variable globale utilisée partout
// ============================================================

let roleUtilisateur = "gratuit"; // valeur par défaut

async function chargerRoleUtilisateur() {

    const token = localStorage.getItem("token");
    if (!token) return; // pas connecté, pas besoin de vérifier

    try {

        const res = await fetch("/api/me", {
            headers: { "Authorization": "Bearer " + token }
        });

        if (!res.ok) return;

        const data = await res.json();
        roleUtilisateur = data.role; // "gratuit", "pro", ou "ia"

        // Lance l'adaptation de l'interface selon le rôle
        adapterInterfaceSelonRole(data);

    } catch (err) {
        console.log("Erreur récupération rôle :", err);
    }

}


// ============================================================
// ADAPTATION DE L'INTERFACE
// Reçoit les données du /api/me et adapte tous les éléments
// ============================================================

function adapterInterfaceSelonRole(data) {

    const { role, isPro, isIA, premiumExpiry } = data;

    // ── Badge premium dans le header (si l'élément existe) ──
    const badgeEl = document.getElementById("badge-role");
    if (badgeEl) {
        if (isIA) {
            badgeEl.textContent = "⚡ IA";
            badgeEl.className = "badge-ia";
        } else if (isPro) {
            badgeEl.textContent = "⭐ Pro";
            badgeEl.className = "badge-pro";
        } else {
            badgeEl.textContent = "Gratuit";
            badgeEl.className = "badge-gratuit";
        }
        badgeEl.style.display = "inline-block";
    }

    // ── Cadenas sur les examens (page anciennesepreuves.html) ──
    const cartesExamens = document.querySelectorAll(".exam-card[data-locked='true']");
    cartesExamens.forEach(carte => {
        if (!isPro) {
            // Ajoute l'overlay cadenas sur les cartes bloquées
            if (!carte.querySelector(".lock-overlay")) {
                const overlay = document.createElement("div");
                overlay.className = "lock-overlay";
                overlay.innerHTML = `
                    <span class="lock-icon">🔒</span>
                    <span class="lock-text">Pro</span>
                `;
                carte.appendChild(overlay);
                carte.classList.add("exam-locked");

                // Remplace le clic par la modal d'upgrade
                carte.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    ouvrirModalUpgrade("pro");
                });
            }
        }
    });

    // ── Cadenas sur les jeux (page jeuxeducatifs.html) ──
    const jeuxBloques = document.querySelectorAll(".jeu-card[data-premium='true']");
    jeuxBloques.forEach(jeu => {
        if (!isPro) {
            jeu.classList.add("jeu-locked");
            const overlay = document.createElement("div");
            overlay.className = "lock-overlay";
            overlay.innerHTML = `<span class="lock-icon">🔒</span><span class="lock-text">Pro</span>`;
            jeu.appendChild(overlay);
            jeu.addEventListener("click", (e) => {
                e.preventDefault();
                ouvrirModalUpgrade("pro");
            });
        }
    });

    // ── Bouton chatbot IA (si présent sur la page) ──
    const chatbotBtn = document.getElementById("chatbot-btn");
    if (chatbotBtn && !isIA) {
        chatbotBtn.classList.add("btn-locked");
        chatbotBtn.addEventListener("click", (e) => {
            e.preventDefault();
            ouvrirModalUpgrade("ia");
        });
    }

    // ── Bannière Pro dans la Ligue Bac ──
    const banniereQuiz = document.getElementById("banniere-limite-quiz");
    if (banniereQuiz && !isPro) {
        banniereQuiz.style.display = "block";
    }

}


// ============================================================
// VÉRIFICATION LIMITE QUIZ
// À appeler AVANT de lancer un quiz (dans liguebac.html / jouer.html)
// Retourne true si l'utilisateur peut jouer, false sinon
// ============================================================

async function verifierLimiteQuiz() {

    const token = localStorage.getItem("token");
    if (!token) return false;

    try {

        const res = await fetch("/api/quiz/check-pro", {
            headers: { "Authorization": "Bearer " + token }
        });

        const data = await res.json();

        if (!data.canPlay) {
            // Affiche le message de limite avec la modal d'upgrade
            ouvrirModalUpgradeLimite(data.message);
            return false;
        }

        // Si gratuit, affiche le nombre de quiz restants
        if (data.role === "gratuit" && data.restants !== undefined) {
            const infoEl = document.getElementById("quiz-restants");
            if (infoEl) {
                infoEl.textContent = `Quiz restants aujourd'hui : ${data.restants}/3`;
                infoEl.style.display = "block";
            }
        }

        return true;

    } catch (err) {
        console.log("Erreur vérification quiz :", err);
        return false;
    }

}


// ============================================================
// INCREMENT QUIZ
// À appeler APRÈS qu'un quiz soit terminé pour compter
// ============================================================

async function incrementerQuizJoue() {

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        await fetch("/api/quiz/increment", {
            method: "POST",
            headers: { "Authorization": "Bearer " + token }
        });
    } catch (err) {
        console.log("Erreur increment quiz :", err);
    }

}


// ============================================================
// CHARGER LES EXAMENS DYNAMIQUEMENT
// Pour la page anciennesepreuves.html
// Appelle le backend qui filtre selon le rôle
// ============================================================

async function chargerExamens() {

    const token = localStorage.getItem("token");
    if (!token) {
        ouvrirModal(); // redirige vers connexion
        return;
    }

    try {

        const res = await fetch("/api/examens", {
            headers: { "Authorization": "Bearer " + token }
        });

        const data = await res.json();
        const grille = document.getElementById("examens-grille");
        if (!grille) return;

        grille.innerHTML = "";

        data.examens.forEach(examen => {

            const carte = document.createElement("div");
            carte.className = "exam-card" + (examen.locked ? " exam-locked" : "");
            carte.dataset.locked = examen.locked ? "true" : "false";

            if (examen.locked) {
                // Carte verrouillée — affiche cadenas
                carte.innerHTML = `
                    <div class="exam-icon">📄</div>
                    <h3>${examen.titre}</h3>
                    <div class="lock-overlay">
                        <span class="lock-icon">🔒</span>
                        <span class="lock-text">Pro</span>
                    </div>
                `;
                carte.addEventListener("click", () => ouvrirModalUpgrade("pro"));
            } else {
                // Carte débloquée — ouvre le PDF
                carte.innerHTML = `
                    <div class="exam-icon">📄</div>
                    <h3>${examen.titre}</h3>
                    <span class="exam-tag">${examen.annee}</span>
                `;
                carte.addEventListener("click", () => ouvrirExamen(examen.driveId));
            }

            grille.appendChild(carte);

        });

    } catch (err) {
        console.log("Erreur chargement examens :", err);
    }

}


// ============================================================
// VISIONNEUSE PDF (Google Drive iframe)
// ============================================================

function ouvrirExamen(driveId) {
    const url = `https://drive.google.com/file/d/${driveId}/preview`;
    document.getElementById("examFrame").src = url;
    document.getElementById("examModal").style.display = "flex";
}

function fermerExamen() {
    document.getElementById("examFrame").src = "";
    document.getElementById("examModal").style.display = "none";
}

// Fermer en cliquant hors de la modal
const examModalEl = document.getElementById("examModal");
if (examModalEl) {
    examModalEl.addEventListener("click", function(e) {
        if (e.target === this) fermerExamen();
    });
}


// ============================================================
// MODAL D'UPGRADE — s'affiche quand un gratuit clique sur Pro
// ============================================================

function ouvrirModalUpgrade(tier) {

    const modal = document.getElementById("modal-upgrade");
    if (!modal) return;

    const titreEl = modal.querySelector(".upgrade-titre");
    const prixEl  = modal.querySelector(".upgrade-prix");
    const btnEl   = modal.querySelector(".upgrade-cta");

    if (tier === "ia") {
        if (titreEl) titreEl.textContent = "Passe à Scola IA ⚡";
        if (prixEl)  prixEl.textContent  = "800 HTG / mois";
        if (btnEl)   btnEl.textContent   = "Obtenir Scola IA";
    } else {
        if (titreEl) titreEl.textContent = "Passe à Scola Pro ⭐";
        if (prixEl)  prixEl.textContent  = "500 HTG / mois";
        if (btnEl)   btnEl.textContent   = "Obtenir Scola Pro";
    }

    modal.style.display = "flex";

}

function ouvrirModalUpgradeLimite(message) {

    const modal = document.getElementById("modal-upgrade");
    if (!modal) return;

    const titreEl = modal.querySelector(".upgrade-titre");
    const texteEl = modal.querySelector(".upgrade-texte");

    if (titreEl) titreEl.textContent = "Limite atteinte 🚫";
    if (texteEl) texteEl.textContent = message || "Tu as atteint ta limite quotidienne. Passe à Pro pour jouer sans limite !";

    modal.style.display = "flex";

}

function fermerModalUpgrade() {
    const modal = document.getElementById("modal-upgrade");
    if (modal) modal.style.display = "none";
}

// Fermer en cliquant dehors
window.addEventListener("click", (e) => {
    const modal = document.getElementById("modal-upgrade");
    if (modal && e.target === modal) fermerModalUpgrade();
});


// ============================================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {

    // Charge le rôle si connecté
    await chargerRoleUtilisateur();

    // Si on est sur la page examens, charge les examens filtrés
    if (document.getElementById("examens-grille")) {
        chargerExamens();
    }

});