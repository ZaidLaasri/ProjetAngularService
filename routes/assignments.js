let Assignment = require('../model/assignment');

function getAssignments(req, res) {
    Assignment.find()
        .populate('matiere')
        .populate('eleve')
        .exec((err, assignments) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(assignments);
        });
}



// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;
    Assignment.findOne({ id: assignmentId })
        .populate('matiere')
        .populate('eleve')
        .exec((err, assignment) => {
            if (err) {
                res.send(err);
                return;
            }

            if (!assignment) {
                res.status(404).send({ message: 'Assignment not found' });
                return;
            }

            res.json(assignment);
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
    assignment.matiere = req.body.matiere;
    assignment.eleve = req.body.eleve;

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
