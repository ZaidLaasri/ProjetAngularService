let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    id: Number,
    nom: String,
    email: String,
    mdp: String,
    admin: Boolean,
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('User', UserSchema);