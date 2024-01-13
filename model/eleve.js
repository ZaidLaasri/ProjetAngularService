let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EleveSchema = Schema({
    id: Number,
    nom: String,
    numero: String,

    // autres propriétés...
},{ collection: 'eleve' });

module.exports = mongoose.model('Eleve', EleveSchema);