let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    id: Number,
    nom: String,
    email: String,
    mdp: String,
    admin: Boolean,
});

module.exports = mongoose.model('User', UserSchema);