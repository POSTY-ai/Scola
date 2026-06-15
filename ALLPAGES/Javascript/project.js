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
