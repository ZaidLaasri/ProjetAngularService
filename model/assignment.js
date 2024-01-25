let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateRendu: Date,
    nom: String,
    rendu: Boolean,
    note: Number,
    matiere: { type: Schema.Types.ObjectId, ref: 'Matiere' },
    eleve: { type: Schema.Types.ObjectId, ref: 'Eleve' },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
