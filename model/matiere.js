let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    id: Number,
    nom: String,
    image: String,
    professeur: String,
    photoProfesseur: String,
},{ collection: 'matiere' });

module.exports = mongoose.model('Matiere', MatiereSchema);