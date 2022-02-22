const db = require("../models");
const Passed_questionnaire = db.passed_questionnaires;



exports.createPassed_questionnaire = (req, res) => {
    // Validation de la requête
    if (!req.body.id_questionnaire) {
        res.status(400).send({ message: "Le contenu ne peux pas être vide" });
    return;
    }
    // Création de l'objet
    const passed_questionnaire = new Passed_questionnaire({
        id_questionnaire: req.body.id_questionnaire,
        id_student: req.body.id_student,
    });
    // Sauvegarde de l'objet dans la base de données
    passed_questionnaire
        .save(passed_questionnaire)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erreur | Impossible de créer l'objet Tutorial"
            });
    });
};
exports.getStatCollabQuest = (req, res) => {
    Passed_questionnaire.find({"id_student":req.body.id_student,"corrected": false}).count()
        .then(data => {
            res.send(JSON.stringify(data));
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
},
exports.getStatQuest = (req, res) => {
    Passed_questionnaire.find({"corrected": false}).count()
        .then(data => {
            res.send(JSON.stringify(data));
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
},

exports.updatePassedQuestionnaire = (req, res) => {
    let status = {
        corrected: true
    }
    Passed_questionnaire.find({"id_questionnaire":req.body.id_questionnaire,"id_student":req.body.id_student})
        .then(data => {
            id_questionnaire = data[0]._id
            Passed_questionnaire.findByIdAndUpdate(id_questionnaire, status, { useFindAndModify: false })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Matiere with id: " + id
                });
            });
        })
}
