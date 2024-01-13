let User = require("../model/user");

function authentification(req, res) {
    let nomUtilisateur = req.body.nomUtilisateur;
    let password = req.body.password;

    User.findOne({ nomUtilisateur: nomUtilisateur }, (err, user) => {
        if (err) {
            res.status(500).json({ error: 'Erreur interne du serveur', details: err });
            return;
        }

        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        if (user.mdp === password) {
            // Inclure l'information admin dans la réponse
            res.json({ message: 'Connexion réussie' + user.admin, admin: user.admin });
        } else {
            res.status(401).json({ error: 'Mot de passe incorrect' });
        }
    });
}


function getUser(req, res){
    let userId = req.params.id;

    User.findOne({id: userId}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}

function getUsers(req, res){
    User.find((err, users) => {
        if(err){
            res.send(err)
        }

        res.send(users);
    });
}

module.exports = { authentification, getUsers, getUser };
