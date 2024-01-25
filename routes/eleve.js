const Eleve = require("../model/eleve");

// Obtenir un élève spécifique
function getEleve(req, res) {
    let eleveId = req.params.id;

    Eleve.findOne({ id: eleveId }, (err, eleve) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(eleve);
    });
}

function getEleves(req, res){
    Eleve.find((err, eleves) => {
        if(err){
            res.send(err)
        }

        res.send(eleves);
    });
}

function postEleve(req, res) {
    let eleve = new Eleve();
    eleve.id = req.body.id;
    eleve.nom = req.body.nom;
    eleve.numero = req.body.numero;
    console.log("POST eleve reçu :");
    console.log(eleve)
    eleve.save((err) => {
        if (err) {
            res.send('cant post eleve ', err);
        }
        res.json({message: `${eleve.nom} saved!`})
    })
}

// Autres fonctions pour créer, mettre à jour, supprimer des élèves...
module.exports = { getEleves, postEleve };
