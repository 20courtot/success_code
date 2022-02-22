module.exports = mongoose => {
    const Question = mongoose.model("question",
        mongoose.Schema({
            content_question: String,
            type_question:String,
            value_answer:Array,
            id_questionnaire: String
        })
    );
    return Question;
};