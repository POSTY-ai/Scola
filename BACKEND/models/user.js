// Importation de mongoose
const mongoose = require("mongoose");

// Structure d'un utilisateur dans MongoDB
const userSchema = new mongoose.Schema({

    // Nom de l'utilisateur
    name: {
        type: String,
        required: true
    },

    // Email unique pour éviter les doublons
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Mot de passe haché avec bcrypt
    password: {
        type: String,
        required: true
    },

    // Données de la ligue hebdomadaire
    weeklyLeague: {

        // XP total de la semaine
        xp: {
            type: Number,
            default: 0
        },

        // XP gagnés aujourd'hui
        xpToday: {
            type: Number,
            default: 0
        },

        // Série de jours consécutifs
        streak: {
            type: Number,
            default: 0
        },

        // Ligue actuelle
        league: {
            type: String,
            default: "Bronze"
        },

        // Dernière activité du joueur
        lastActivity: {
            type: Date,
            default: null
        }

    },
    dailyQuiz: {
    lastPlayed: {
        type: Date,
        default: null
    }
},

weeklyLeague: {
    xp: { type: Number, default: 0 },        // ← remet à zéro chaque semaine
    xpToday: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    league: { type: String, default: "Bronze" },
    lastActivity: { type: Date, default: null }
},

// ← AJOUTE CECI — jamais remis à zéro
xpTotal: { type: Number, default: 0 },
// xpTotal = cumul de tous les XP gagnés depuis l'inscription

resetToken: {
    type: String,
    default: null
},

resetTokenExpiration: {
    type: Date,
    default: null
},

});




// Export du modèle
module.exports = mongoose.model(
    "User",
    userSchema
);