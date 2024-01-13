let Matiere = require("../model/matiere");
const Assignment = require("../model/assignment");


function getMatiers(req, res){
    Matiere.find((err, matiers) => {
        if(err){
            res.send(err)
        }

        res.send(matiers);
    });
}


module.exports = {  getMatiers  };
