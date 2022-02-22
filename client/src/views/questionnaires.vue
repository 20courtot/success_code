<template>
  <div class="about">
    <div id="roulette">
      <h1>
        {{ this.selected.questionnaire.nom_questionnaire}}
      </h1>
      <div style="margin : 50px;"> 
        <h2>
            <p style="border: 5px dashed #0d6efd; padding:5px; border-radius: 10px;">{{"" + selected.question.content_question}}</p>
        </h2>   
      </div>
      <div>
        <div v-if="qcm">
          <div class="btn-group" style="margin-top:50px; display:flex;justify-content:center;" role="group" aria-label="Basic example" v-for="v in selected.question.value_answer" v-bind:key="v.answer_content">
              <input  class="form-check-input" style="margin-top:30px;padding:10px;" type="radio" v-model="answer_content_student" :value="v.answer_content">
              <label class="form-check-label"  style="font-size:30px; margin-top:15px; padding-left:20px;" :for="v.answer_content"> {{v.answer_content}}</label>
          </div>
        </div>
        <div v-if="libre">
          <div class="btn-group">
            <div class="mb-3">
              <label for="libre" class="form-label">Votre réponse:</label>
              <input type="text" v-model="answer_content_student" class="form-control" id="libre" placeholder="Répondre">
            </div>
          </div>        
        </div>
      </div>
      <br>
      <button class="btn btn-primary btn-lg" @click="nextQ">Question suivante</button>

  
    </div>
  </div>
</template>
<script>

function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }
export default {  

   
        methods: { 
          get_questionnaire(){
            const requestOpt = {
                  method: "POST",
                  body: JSON.stringify({"_id": this.id_questionnaire_selected}),
                  headers: { 'Content-type': 'application/json; charset=UTF-8' }
              };          
              fetch("http://localhost:3000/success/getQuestionnaire", requestOpt)
                .then((response) => response.text())
                // Sucess
                .then((result) => {
                        this.selected.questionnaire = JSON.parse(result);
                })
                . catch((error) => { console.log("error", error); })
          },
          get_questions() {
            var tik = this.tik;
            this.tik = tik+1;
              const requestOpt = {
                  method: "POST",
                  body: JSON.stringify({"id_questionnaire": this.id_questionnaire_selected}),
                  headers: { 'Content-type': 'application/json; charset=UTF-8' }
              };          fetch("http://localhost:3000/success/getQuestionList", requestOpt)
                .then((response) => response.text())
                // Sucess
                .then((result) => {
                      if(tik == 0){
                        var resultJ = JSON.parse(result);
                        this.selected.list_question = shuffle(resultJ);
                        this.selected.question = resultJ;
                      }
                      if(tik < this.selected.list_question.length){
                        this.selected.question = this.selected.list_question[tik];
                        if(this.selected.question.type_question == "qcm"){
                          this.qcm = true
                        }
                        else if(this.selected.question.type_question == "libre"){
                          this.libre = true
                        }
                      }
                })
                .catch((error) => { console.log("error", error); })
          },
        
        
        nextQ(){
          if(this.selected.question.type_question == "qcm"){
            this.corrected = true
          }
          else if(this.selected.question.type_question == "libre"){
            this.corrected = false
          }
          
          const requestOpt = {
                method: "POST",
                body: JSON.stringify({"answer_content": this.answer_content_student, "id_question": this.selected.question._id,"id_questionnaire": this.selected.question.id_questionnaire, "id_student": this.id_student, "corrected":this.corrected,}),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            };
            fetch("http://localhost:3000/success/saveAnswer", requestOpt)
                .then((response) => response.text())
                .catch((error) => { console.log("error", error); })

          
          var tik = this.tik;
          this.tik = tik+1;
          if(tik < this.selected.list_question.length){
          this.selected.question = this.selected.list_question[tik];
          if(this.selected.question.type_question == "qcm"){
            this.qcm = true;
            this.libre = false;
          }
          else if(this.selected.question.type_question == "libre"){
            this.libre = true;
            this.qcm = false;
          }
          }
          if(tik >= this.selected.list_question.length){
            this.next = true
          }
            if(this.next == true){
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
            else if (document.webkitExitFullscreen) { /* Safari */
              document.webkitExitFullscreen();
            } 
            else if (document.msExitFullscreen) { /* IE11 */
              document.msExitFullscreen();
            } 
            this.$router.push({name :"questionnaireEnd", params: { id_questionnaire: this.selected.question.id_questionnaire}})
          }
            this.answer_content_student = ""
        }
        },
        
    data() {
        return {
            corrected : false,
            qcm:false,
            libre:false,
            id_questionnaire_selected: this.$route.params.id_questionnaire,
            answer_content_student:"",
            id_student:this.$store.getters.UserData._id,
            tik:0,
            next:false,
            selected: {
                questionnaire:{
                  nom_questionnaire:""
                },
                question:{
                  _id:"",
                  id_questionnaire:"",
                  content_question:"",
                  type_question:"",
                  value_answer:[{answer_content:""}],
                  list_question:""
                }
            }
        }
    },
    created(){
      if(!this.$store.getters.UserData){
        this.$router.push({ name: 'Login' })   
      }
      this.get_questions()
      this.get_questionnaire()
      setTimeout(
        function () {
          if(this.selected.question.type_question == "libre"){
            this.corrected = false
          }
          else{
            this.corrected = true
          }
        }.bind(this),
        150
      );
    }
}

</script>
