module.exports = app => {
    const studentController = require("../controllers/student.controller.js");
    var router = require("express").Router();
    const questionnaireController = require("../controllers/questionnaire.controller.js");
    const passed_questionnaireController = require("../controllers/passed_questionnaires.controller.js");
    const questionController = require("../controllers/question.controller.js");
    const loginController = require("../controllers/login.controller.js")

    router.post("/login", function(req, res, next) {
        loginController.login(req, res, next);
    });
    
    router.post("/register", function(req, res, next) {
        loginController.register(req, res, next);
    });

    // router.post("/register", loginController.register);
    // app.use('/success', router);

    router.post("/getAnswer", studentController.getAnswer);
    app.use('/success', router);

    router.get("/getStudent", studentController.getStudent);
    app.use('/success', router);

    router.post("/getStudenttocorrect", studentController.getStudenttocorrect);
    app.use('/success', router);

    router.post("/getAnswertoCorrectList", studentController.getAnswertoCorrectList);
    app.use('/success', router);
// recupquestionnaire
    router.get("/getQuestionnaireList", questionnaireController.getQuestionnaireList);
    app.use('/success', router);

    router.post("/updateAns", studentController.updateAns);
    app.use('/success', router);

    router.post("/getPassed_questionnairesList", questionnaireController.getPassed_questionnairesList);
    app.use('/success', router);

    router.post("/getNotPassed_questionnairesList", questionnaireController.getNotPassed_questionnairesList);
    app.use('/success', router);

    router.post("/getQuestionnaire", questionnaireController.getQuestionnaire);
    app.use('/success', router);

    router.post("/createQuestionnaire", questionnaireController.createQuestionnaire);
    app.use('/success', router);

    router.post("/createPassed_questionnaire", passed_questionnaireController.createPassed_questionnaire);
    app.use('/success', router);

    router.post("/updatePassedQuestionnaire", passed_questionnaireController.updatePassedQuestionnaire);
    app.use('/success', router);

    router.get("/getStatQuest", passed_questionnaireController.getStatQuest);
    app.use('/success', router);
    
    router.post("/getStatCollabQuest", passed_questionnaireController.getStatCollabQuest);
    app.use('/success', router);

    router.post("/getCollabStat", questionController.getCollabStat);
    app.use('/success', router);

    router.post("/getGlobalStat", questionController.getGlobalStat);
    app.use('/success', router);
    
    router.get("/countQuestionnaire", questionnaireController.countQuestionnaire);
    app.use('/success', router);

    router.post("/deleteQuestionnaire", questionnaireController.deleteQuestionnaire);
    app.use('/success', router);

    router.post("/updateQuestionnaire", questionnaireController.updateQuestionnaire);
    app.use('/success', router);
    
    router.post("/getQuestionList", questionController.getQuestionList);
    app.use('/success', router);

    router.get("/getStat", questionController.getStat);
    app.use('/success', router);

    router.post("/getQuestion", questionController.getQuestion);
    app.use('/success', router);

    router.post("/getScore", questionController.getScore);
    app.use('/success', router);

    router.post("/countQuestion", questionController.countQuestion);
    app.use('/success', router);
   
    router.post("/createQuestion", questionController.createQuestion);
    app.use('/success', router);

    router.post("/deleteQuestions", questionController.deleteQuestions);
    app.use('/success', router);

    router.post("/deleteQuestion", questionController.deleteQuestion);
    app.use('/success', router);
//envoyerReponse
    

router.post("/saveAnswer", function(req, res) {
        studentController.saveAnswer(req, res);
    });
}
    