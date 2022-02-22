module.exports = mongoose => {
    const Student_answer = mongoose.model("student_answer",
        mongoose.Schema({
            answer_content: String,
            id_question: String,
            id_questionnaire:String,
            id_student: String,
            corrected:{ type:Boolean, default: false},
            result:{ type:Boolean, default: false}

        })
    );
    return Student_answer;
};