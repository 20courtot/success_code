module.exports = mongoose => {
    const Questionnaire = mongoose.model("questionnaire",
        mongoose.Schema({
            nom_questionnaire: String,
            matiere: String,
            code: String
        })
    );
    return Questionnaire;
};