const db = require("../models");
const Questionnaire = db.questionnaire;
const Passed_questionnaire = db.passed_questionnaires;
var questionnaireList = {};
var passed_questionnaireList = {};

exports.getNotPassed_questionnairesList = (req, res) => {
    var Passed_questionnaire_ID = [];
    Passed_questionnaire.find({"id_student":req.body.id_student})
        .then(data => {
            data.forEach(v => {
                Passed_questionnaire_ID.push(
                    v.id_questionnaire
                  );
            });
            Questionnaire.find({'_id':{$in:Passed_questionnaire_ID}})
                .then(data => {
                    passed_questionnaireList = data;
                    res.send(passed_questionnaireList)        
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Il y un problème avec la reception des questioannaires."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
}

exports.getPassed_questionnairesList = (req, res) => {
    var Passed_questionnaire_ID = [];
    Passed_questionnaire.find({"id_student":req.body.id_student})
        .then(data => {
            data.forEach(v => {
                Passed_questionnaire_ID.push(
                    v.id_questionnaire
                  );
            });
            Questionnaire.find({'_id':{$nin:Passed_questionnaire_ID}})
                .then(data => {
                    passed_questionnaireList = data;
                    res.send(passed_questionnaireList)        
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Il y un problème avec la reception des questioannaires."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
}

exports.getQuestionnaireList = (req, res) => {
    Questionnaire.find()
        .then(data => {
            questionnaireList = data;
            res.send(questionnaireList)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
    
}
exports.getQuestionnaireList = (req, res) => {
    Questionnaire.find()
        .then(data => {
            questionnaireList = data;
            res.send(questionnaireList)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
    
}

exports.getQuestionnaire = (req, res) => {
    Questionnaire.findById(req.body._id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
}

exports.countQuestionnaire = (req, res) => {
    Questionnaire.find().count()
        .then(data => {
            res.send(JSON.stringify(data));
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
},

exports.createQuestionnaire = (req, res) => {
    // Validation de la requête
    if (!req.body.nom_questionnaire) {
        res.status(400).send({ message: "Le contenu ne peux pas être vide" });
    return;
    }

    // Création de l'objet
    const questionnaire = new Questionnaire({
        nom_questionnaire: req.body.nom_questionnaire,
        matiere: req.body.matiere,
        code: req.body.code
    });

    // Sauvegarde de l'objet dans la base de données
    questionnaire
        .save(questionnaire)
        .then(data => {
            id_questionnaire_str = JSON.stringify(data._id)
            id_questionnaire = JSON.parse(id_questionnaire_str)
            res.send(id_questionnaire);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erreur | Impossible de créer l'objet Tutorial"
            });
    });
};
exports.deleteQuestionnaire = (req, res) => {
    const id = req.body.id;
    Questionnaire.findByIdAndRemove(id)
        .catch(err => {
            res.status(500).send({
                message: "Could not delete questionnaire with id=" + id
            });
        });
};

exports.updateQuestionnaire = (req, res, next) => {
    let category = {
        nom_questionnaire: req.body.nom_questionnaire,
        matiere: req.body.matiere,
        code: req.body.code
    }

    Questionnaire.findByIdAndUpdate(req.body.id, category, { useFindAndModify: false })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Matiere with id: " + id
            });
        });
}