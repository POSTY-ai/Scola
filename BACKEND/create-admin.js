require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const User = require('./models/user');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = prompt => new Promise(resolve => rl.question(prompt, resolve));

async function createAdmin() {
    const name = (await question('Nom admin : ')).trim();
    const email = (await question('Email admin : ')).trim().toLowerCase();
    const password = await question('Mot de passe admin : ');

    if (!name || !email || password.length < 8) {
        throw new Error('Nom/email obligatoires et mot de passe de 8 caractères minimum.');
    }

    await mongoose.connect(process.env.MONGO_URI);
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        existingUser.name = name;
        existingUser.password = hashedPassword;
        existingUser.role = 'admin';
        existingUser.premiumExpiry = null;
        await existingUser.save();
        console.log(`Compte existant promu admin : ${email}`);
    } else {
        await User.create({ name, email, password: hashedPassword, role: 'admin' });
        console.log(`Compte admin créé : ${email}`);
    }
}

createAdmin()
    .catch(error => {
        console.error('Création admin impossible :', error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        rl.close();
        if (mongoose.connection.readyState) await mongoose.disconnect();
    });
