let Assignment = require('../model/assignment');
const Matiere = require('../model/matiere'); // Modèle Matiere
const Eleve = require('../model/eleve'); // Modèle Eleve

a = 0;
b = 10;

function getAssignments(req, res) {
    let start = 0 ;
    let limit =  10;
    let search = req.query.search || "";


    a = start;
    b = limit;
    // Créer un filtre de recherche si un terme de recherche est fourni
    let searchFilter = search ? {nom: {$regex: search, $options: "i"}} : {};

    Assignment.find(searchFilter).exec((err, allAssignments) => {
        if (err) {
            res.send(err);
            return;
        }

        const total = allAssignments.length;

        Assignment.find(searchFilter)
            .skip(start)
            .limit(limit)
            .exec((err, assignments) => {
                if (err) {
                    res.send(err);
                    return;
                }

                let promises = assignments.map(assignment => {
                    let matierePromise = Matiere.findOne({id: assignment.matiere});
                    let elevePromise = Eleve.findOne({id: assignment.eleve});

                    return Promise.all([matierePromise, elevePromise]).then(([matiere, eleve]) => {
                        return {...assignment.toObject(), matiere, eleve};
                    });
                });

                Promise.all(promises)
                    .then(results => res.json(results))
                    .catch(error => res.status(500).send(error));
            });
    });
}


// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}).exec((err, assignment) => {
        if (err) {
            res.send(err);
            return;
        }

        if (!assignment) {
            res.status(404).send({message: 'Assignment not found'});
            return;
        }

        let matierePromise = Matiere.findOne({id: assignment.matiere});
        let elevePromise = Eleve.findOne({id: assignment.eleve});

        Promise.all([matierePromise, elevePromise])
            .then(([matiere, eleve]) => {

                res.json({...assignment.toObject(), matiere, eleve});
            })
            .catch(error => {
                console.error("Error during population:", error);
                res.status(500).send(error);
            });
    });
}


// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateRendu = req.body.dateRendu;
    assignment.rendu = req.body.rendu;
    assignment.note = req.body.note;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        }
        res.json({message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({message: 'updated'})
        }

        // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}


module.exports = {getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment};
