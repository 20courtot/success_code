<template>
  <div class="manageQuestionnaire">
    <h1 class="display-3" style="margin-bottom:30px;">Success</h1>
    <nav-bar />
    <br>
    <h1>Gérer les questionnaires</h1>
    <div class="m-5 d-inline-block" style="width: 500px" v-if="list_div">
      <table class="table table-stripe">
        <thead>
          <tr>
            <th colspan="4">Les questionnaires</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nom</td>
            <td>Matière</td>
            <td>Code</td>
          </tr>
          <tr
            v-for="v in selected.questionnaire"
            :key="v.nom_questionnaire"
            v-bind="selected.questionnaire"
          >
            <td>{{ v.nom_questionnaire }}</td>
            <td>{{ v.matiere }}</td>
            <td>{{ v.code }}</td>
            <td>
              <a
                type="button"
                @click="delete_questionnaire(v._id)"
                style="margin-left: 20px"
                ><i class="fas fa-trash-alt"></i></a
              ><a
                type="button"
                @click="goUpdate(v._id, v.nom_questionnaire, v.matiere, v.code)"
                style="margin-left: 20px"
                ><i class="far fa-edit"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="m-5 d-inline-block w-25" v-if="update_div">
       
      <div class="btn-group">
        <div class="mb-3">
          <label for="nom_update" class="form-label"
            >nom du questionnaire</label
          >
          <input
            type="text"
            v-model="nom_update"
            class="form-control"
            id="nom_update"
          />
          <br />
          <label for="matiere" class="form-label">Matière</label>
          <input
            type="text"
            v-model="matiere_update"
            class="form-control"
            id="matiere"
            placeholder="Mot de passe"
          />
          <br>
          <label for="code" class="form-label">Code secret</label>
          <input
            type="text"
            v-model="code_update"
            class="form-control"
            id="code"
            placeholder="Mot de passe"
          />
        </div>
      </div>
      <br />
      <div style="margin-top: 20px">
        <button
          class="btn btn-primary btn-lg btn-block"
          @click="update_questionnaire"
        >
          Modifier
        </button>
        <br>
        <br>
        <br>
        <table class="table table-stripe">
        <thead>
          <tr>
            <th colspan="2">Les Questions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Énoncé</td> 
            <td>Supprimer</td> 
          </tr>
          <tr
            v-for="v in selected.question"
            :key="v.content_question"
            v-bind="selected.question"
          >
            <td>{{ v.content_question }}</td>
            <td><a
                type="button"
                @click="delete_question(v._id)"
                style="margin-left: 20px"
                ><i class="fas fa-trash-alt"></i></a
              >
            </td> 
          </tr>
        </tbody>
      </table>
      </div>
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
    update_questionnaire() {
      const requestOpt = {
        method: "POST",
        body: JSON.stringify({
          id: this.id_update,
          nom_questionnaire: this.nom_update,
          matiere: this.matiere_update,
          code: this.code_update,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
      fetch("http://localhost:3000/success/updateQuestionnaire", requestOpt)
        .then((response) => response.text())
        .catch((error) => {
          console.log("error", error);
        });
      setTimeout(
        function () {
          this.get_questionnaire();
          window.location.reload();
        }.bind(this),
        50
      );
    },
    goUpdate(id, nom_questionnaire, matiere, code) {
      this.nom_update = nom_questionnaire,
      this.matiere_update = matiere,
      this.code_update = code,
      this.id_update = id,
      this.list_div = false,
      this.update_div = true;
      this.get_question()
    },
    get_question(){
      if(this.id_update){
      const requestOpt = {
          method: "POST",
          body: JSON.stringify({"id_questionnaire":this.id_update}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        };  
        fetch("http://localhost:3000/success/getQuestionList", requestOpt)
          .then((response) => response.text())
          // Sucess
          .then((result) => {
            this.selected.question = JSON.parse(result)
          })
          .catch((error) => { console.log("error", error); })
      }
      else{
        alert('une erreur est survenu')
      }
    },
    delete_question(id){
      const requestOpt = {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
      fetch("http://localhost:3000/success/deleteQuestion", requestOpt)
        .then((response) => response.text())
        .catch((error) => {
          console.log("error", error);
        });
        this.selected.question = "",
        setTimeout(
        function () {
          this.get_question();
        }.bind(this),
        50
      );
    },
    delete_questionnaire(id) {
      const requestOpt = {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
      fetch("http://localhost:3000/success/deleteQuestionnaire", requestOpt)
        .then((response) => response.text())
        .catch((error) => {
          console.log("error", error);
        });
      setTimeout(
        function () {
          this.get_questionnaire();
          window.location.reload();
        }.bind(this),
        50
      );
      const requestOptb = {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
      fetch("http://localhost:3000/success/deleteQuestions", requestOptb)
        .then((response) => response.text())
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
      nom_update: "",
      matiere_update: "",
      code_update: "",
      id_update: "",
      list_div: true,
      update_div: false,
      selected: {
        questionnaire: {
          nom_questionnaire: "",
          matiere: "",
          code: "",
          _id: "",
        },
        question: {
          _id: "",
          id_questionnaire: "",
          content_question: "",
          type_question: "",
          value_answer: [{ answer_content: "" }],
          list_question: "",
        },
      },
    };
  },
  created() {
    if(!this.$store.getters.UserData){
      this.$router.push({ name: 'Login' })   
    }
    this.get_questionnaire();
  },
};
</script>
