const db = require("../models");
const User = db.users;
const Student_answer = db.student_answers;
const Passed_questionnaire = db.passed_questionnaires;

var name = "Quentin";
var studentList = {};
var answerList = {};
var passed_questionnaireList = {};
exports.getStudent = (req, res) => {
    Studserent.findOne({"surname":name})
        .then(data => {
            studentList = data;
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des utilisateur."
            });
        });
    res.send(studentList)
};

exports.getStudenttocorrect = (req, res) => {
    var Passed_questionnaire_ID = [];
    Passed_questionnaire.find({"id_questionnaire":req.body.id_questionnaire,"corrected":false})
        .then(data => {

            data.forEach(v => {
                Passed_questionnaire_ID.push(
                    v.id_student
                    
                  );
            });
            User.find({'_id':{$in:Passed_questionnaire_ID}, corrected:false})
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
exports.getAnswertoCorrectList = (req, res) => {
    Student_answer.find({"id_questionnaire":req.body.id_questionnaire,"id_student":req.body.id_student,"corrected":false })
        .then(data => {
            res.send(data)         
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
},

exports.updateAns = (req, res) => {
    let correction = {
        corrected: true,
        result: req.body.status,
    }

    Student_answer.findByIdAndUpdate(req.body.id, correction, { useFindAndModify: false })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Matiere with id: " + id
            });
        });
}

exports.saveAnswer = (req, res) => {
    // Validation de la requête
    if (!req.body.answer_content) {
        res.status(400).send({ message: "Le contenu ne peux pas être vide" });
    return;
    }
    // Création de l'objet
    const ans = new Student_answer({
        answer_content: req.body.answer_content,
        id_question: req.body.id_question,
        id_questionnaire: req.body.id_questionnaire,
        id_student: req.body.id_student,
        corrected: req.body.corrected
    });
    // Sauvegarde de l'objet dans la base de données
    ans
        .save(ans)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erreur | Impossible de créer l'objet Tutorial"
            });
    });
};

exports.getAnswer = (req, res) => {
    Student_answer.find({"id_questionnaire" : req.body.id_questionnaire})
        .then(data => {
            answerList = data;
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des utilisateur."
            });
        });
    res.send(answerList)
};


