const db = require("../models");
const Question = db.question;
const Student_answer = db.student_answers;

exports.getScore = (req, res) => {
    var questionList = [];
    var good_answers = [];
    var answerList = [];
    var nb_good_answers = 0;
    var id_stud = "" ;
    var id_studS = "";
    Question.find({"id_questionnaire":req.body.id_questionnaire,"type_question":"qcm"})
        .then(data => {
            questionList = data
            for(let i = 0;i < questionList.length; i++){
                for(let j = 0; j < questionList[i].value_answer.length;j++){
                  if(questionList[i].value_answer[j].answer_status == true){
                    good_answers.push(
                      questionList[i].value_answer[j].answer_content,
                    );
                  }
                }
              }   
            Student_answer.find({ "id_questionnaire" : req.body.id_questionnaire,"corrected":true })
                .then(data => {
                    answerList = data;
                    for(let k = 0;k < good_answers.length; k++){
                        for(let l = 0;l < good_answers.length; l++){
                            if(good_answers[k] == answerList[l].answer_content){
                                nb_good_answers++
                                id_studS = JSON.stringify(answerList[l]._id)
                                id_stud = JSON.parse(id_studS)
                                let studUpdate = {
                                    result: true
                                }
                                Student_answer.findByIdAndUpdate(id_stud, studUpdate, { useFindAndModify: false })
                                .catch(err => {
                                    res.status(500).send({
                                        message: "Error updating stud with id: " + id_stud
                                    });
                                });
                            }
                        }
                    }  
                    res.send("Vous avez eu " + nb_good_answers.toString() + " sur " + questionList.length + " pour les questions en qcm") 
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Il y un problème avec la reception des utilisateur."
                    });
                });       
            })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
    
    
},

exports.getQuestionList = (req, res) => {
    Question.find({"id_questionnaire":req.body.id_questionnaire})
        .then(data => {
            res.send(data)         
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
},

exports.getQuestion = (req, res) => {
    Question.find({"_id":req.body.id_question})
        .then(data => {
            res.send(data)         
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
},
exports.getGlobalStat = (req, res) => {
    var nb_true_ans = "";
    var nb_total_ans = "";
    var result = "";
    Student_answer.find({"id_student":req.body.id_student,"result": true,"corrected": true}).count()
        .then(data => {
            nb_true_ans = JSON.stringify(data);
            Student_answer.find({"id_student":req.body.id_student,"corrected":true}).count()
                .then(data => {
                    nb_total_ans = JSON.stringify(data);
                    result = nb_true_ans * 100 / nb_total_ans
                    res.send(result + " % ")
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
},

exports.getStat = (req, res) => {
    var nb_true_ans = "";
    var nb_total_ans = "";
    var result = "";
    Student_answer.find({"result": true,"corrected": true}).count()
        .then(data => {
            nb_true_ans = JSON.stringify(data);
            Student_answer.find({"corrected":true}).count()
                .then(data => {
                    nb_total_ans = JSON.stringify(data);
                    result = nb_true_ans * 100 / nb_total_ans
                    res.send(result + " % ")
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
},

exports.getCollabStat = (req, res) => {
    var nb_true_ans = "";
    var nb_total_ans = "";
    Student_answer.find({"id_student":req.body.id_student,"id_questionnaire":req.body.id_questionnaire,"result": true,"corrected": true}).count()
        .then(data => {
            nb_true_ans = JSON.stringify(data);
            Student_answer.find({"id_student":req.body.id_student,"id_questionnaire":req.body.id_questionnaire,"corrected":true}).count()
                .then(data => {
                    nb_total_ans = JSON.stringify(data);
                    res.send(nb_true_ans + " / " + nb_total_ans)
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
},


exports.countQuestion = (req, res) => {
    Question.find({"id_questionnaire":req.body.id_questionnaire}).count()
        .then(data => {
            res.send(JSON.stringify(data));
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Il y un problème avec la reception des questioannaires."
            });
        });
},

exports.updateStudAns = (req, res, next) => {
    let AnsUpdate = {
        result: true
    }
    Student_answer.findByIdAndUpdate(req.body.id, AnsUpdate, { useFindAndModify: false })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Matiere with id: " + id
            });
        });
}

exports.createQuestion = (req, res) => {
    // Validation de la requête
    if (!req.body.content_question) {
        res.status(400).send({ message: "Le contenu ne peux pas être vide" });
    return;
    }
    // Création de l'objet
    const question = new Question({
        content_question: req.body.content_question,
        type_question: req.body.type_question,
        id_questionnaire: req.body.id_questionnaire,
        value_answer: req.body.value_answer
    });

    // Sauvegarde de l'objet dans la base de données
    question
        .save(question)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erreur | Impossible de créer l'objet Tutorial"
            });
    });
};

exports.deleteQuestion = (req, res) => {
    const id = req.body.id;
    Question.findByIdAndRemove(id)
        .catch(err => {
            res.status(500).send({
            message: "Could not delete questionnaire with id=" + id
        });
    });
};


exports.deleteQuestions = (req, res) => {
    Question.deleteMany({id_questionnaire: req.body.id})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        });
};
