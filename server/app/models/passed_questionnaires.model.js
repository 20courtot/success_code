module.exports = mongoose => {
    const Passed_questionnaires = mongoose.model("passed_questionnaires",
        mongoose.Schema({
            id_questionnaire: String,
            id_student :String,
            corrected:{ type:Boolean, default: false}
        })
    );
    return Passed_questionnaires;
};