let Matiere = require("../model/matiere");


function getMatiers(req, res){
    Matiere.find((err, matiers) => {
        if(err){
            res.send(err)
        }

        res.send(matiers);
    });
}


module.exports = {  getMatiers  };
