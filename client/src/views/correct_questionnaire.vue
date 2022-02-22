<template>
  <div class="manageQuestionnaire">
    <h1 class="display-3" style="margin-bottom:30px;">Success</h1>
    <nav-bar/>
    <h1 style="margin-top:50px;margin-bottom:20px;">correction</h1>
    <div v-if="chose_quest">
      <label for="select" class="form-label" style="font-size: 20px">
          Choisissez un questionnaire:
        </label>
        <br>
          <select
            @click="show_btn_fonction"
            v-bind="selected.questionnaire"
            v-model="id_questionnaire_selected"
            style="margin-top: 20px; font-size: 20px"
          >
            <option
              style="font-size: 20px;"
              v-for="v in selected.questionnaire"
              v-bind:key="v.nom_questionnaire"
              v-text="v.nom_questionnaire"
              :value="v._id"
            />
          </select>
          <br>
          <button @click="go_chose_stud" class="btn btn-primary btn-lg" style="margin-top: 30px; margin-left: 0px" v-if="show_btn">test</button>
    </div>
    <div v-if="chose_stud">
      <select
            @click="show_ans_btn"
            v-bind="selected.studentList"
            v-model="id_student"
            style="margin-top: 20px; font-size: 20px"
          >
            <option
              style="font-size: 20px;"
              v-for="v in selected.studentList"
              v-bind:key="v.username"
              v-text="v.username"
              :value="v._id"
            />
          </select>
          <br>
      <button v-if="Ans_btn" @click="go_correct" class="btn btn-primary btn-lg" style="margin-top: 30px; margin-left: 0px">Corriger</button>
    </div>
    <div v-if="Ans_div">
      <p>Énoncé: {{selected.question[0].content_question}}</p>
      <p>Réponse de l'élève : {{selected.Ans.answer_content}}</p>
      <button @click="nextQuest('vrai')" class="btn btn-primary btn-lg">Vrai</button>
      <button @click="nextQuest('faux')" class="btn btn-primary btn-lg">Faux</button>

    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBarCorr";
export default {
  components: {
    NavBar,
  },
  methods: {
    nextQuest(statut){
      this.tik = this.tik + 1
      if(statut == "vrai"){
        this.status = true

        const requestOpt = {
        method: "POST",
        body: JSON.stringify({
          id: this.selected.Ans._id,
          status: this.status,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
       };
        fetch("http://localhost:3000/success/updateAns", requestOpt)
          .then((response) => response.text())
          .catch((error) => {
            console.log("error", error);
          });
      }
      else{
        this.status = false
        const requestOpt = {
        method: "POST",
        body: JSON.stringify({
          id: this.selected.Ans._id,
          status: this.status,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
       };
        fetch("http://localhost:3000/success/updateAns", requestOpt)
          .then((response) => response.text())
          .catch((error) => {
            console.log("error", error);
          });
      }
      this.go_correct()
    },
    go_correct(){
      this.Ans_btn = false
      this.chose_stud = false
      this.Ans_div = true
      if(this.selected.AnsList && this.tik == this.selected.AnsList.length){
        const requestOpt = {
          method: "POST",
          body: JSON.stringify({
            id_questionnaire: this.id_questionnaire_selected,
            id_student: this.id_student,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
         };
        fetch("http://localhost:3000/success/updatePassedQuestionnaire", requestOpt)
          .then((response) => response.text())
          .catch((error) => {
            console.log("error", error);
          });

        const requestOpt_info = {
          method: "POST",
          body: JSON.stringify({ id_questionnaire: this.id_questionnaire_selected }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        };
        fetch(
          "http://localhost:3000/success/getStudenttocorrect",requestOpt_info
        )
          .then((response) => response.text())
          // Sucess
          .then((result) => {
            this.selected.studentList = JSON.parse(result);
          })
          .catch((error) => {
            console.log("error", error);
          });
        this.chose_stud = true
        this.Ans_div = false
      }
      else{
        if(this.tik == 0){
          const requestOpt_info = {
            method: "POST",
            body: JSON.stringify({ id_questionnaire: this.id_questionnaire_selected,id_student:this.id_student}),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          };
          fetch(
            "http://localhost:3000/success/getAnswertoCorrectList",
            requestOpt_info
          )
            .then((response) => response.text())
            // Sucess
            .then((result) => {
              this.selected.AnsList = JSON.parse(result);
              this.selected.Ans = this.selected.AnsList[this.tik]
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
        else{
          this.selected.Ans = this.selected.AnsList[this.tik]
        }
      }   
      setTimeout(
      function () {
        const requestOpt_infob = {
        method: "POST",
        body: JSON.stringify({ id_question: this.selected.Ans.id_question}),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
        fetch(
        "http://localhost:3000/success/getQuestion",
        requestOpt_infob
      )
        .then((response) => response.text())
        // Sucess
        .then((result) => {
          this.selected.question = JSON.parse(result);
        })
        .catch((error) => {
          console.log("error", error);
        });
      }.bind(this),
      50
      );
    },

    show_ans_btn(){
      if(this.id_student){
      this.Ans_btn = true
      }
    },
    show_btn_fonction() {
      if(this.id_questionnaire_selected){
      setTimeout(
        function () {
          const requestOpt_info = {
            method: "POST",
            body: JSON.stringify({ _id: this.id_questionnaire_selected }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          };
          fetch(
            "http://localhost:3000/success/getQuestionnaire",
            requestOpt_info
          )
            .then((response) => response.text())
            // Sucess
            .then((result) => {
              this.selected.questionnaire_info = JSON.parse(result);
            })
            .catch((error) => {
              console.log("error", error);
            });
          this.show_btn = true;
        }.bind(this),
        100
      );
      }
    },
    go_chose_stud(){
      this.chose_stud = true
      this.chose_quest = false
      const requestOpt_info = {
            method: "POST",
            body: JSON.stringify({ id_questionnaire: this.id_questionnaire_selected }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          };
          fetch(
            "http://localhost:3000/success/getStudenttocorrect",requestOpt_info
          )
            .then((response) => response.text())
            // Sucess
            .then((result) => {
              this.selected.studentList = JSON.parse(result);
            })
            .catch((error) => {
              console.log("error", error);
            });
    },

    get_questionnaire() {
      const requestOpt = { method: "GET", redirect: "follow" };
      fetch("http://localhost:3000/success/getQuestionnaireList", requestOpt)
        .then((response) => response.text())
        // Sucess
        .then((result) => {
          this.selected.questionnaire = JSON.parse(result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },

  data() {
    return {
      status:false,
      tik : 0,
      Ans_btn:false,
      Ans_div:false,
      chose_stud : false,
      chose_quest: true,
      show_btn : false,
      id_questionnaire_selected: "",
      id_student:"",
      selected: {
        Ans : {
          answer_content:"",
          id_question:""
        },
        question : {
          content_question:""
        },
        studentList :{
          username:""
        },
        questionnaire: {
          nom_questionnaire: "",
          _id: "",
        },
      },
    };
  },
  created() {
    if(!this.$store.getters.UserData){
      this.$router.push({ name: 'Login' })   
    }
    this.get_questionnaire()
  },
};
</script>
