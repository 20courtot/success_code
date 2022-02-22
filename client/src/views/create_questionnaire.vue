<template>
  <div class="createQuestionnaire">
    <h1 class="display-3" style="margin-bottom:30px;">Success</h1>
    <nav-bar/>
    <h1 style="margin-top:50px;">Créer des questionnaire</h1>
    <div
      class="btn-group-vertical"
      style="margin-top: 50px; justify-content: center; align-items: center"
      role="group"
      aria-label="Basic radio toggle button group"
      v-if="div_select_questionnaire"
    >
      <div
        class="btn-group-vertical"
        style="justify-content: center; align-items: center"
      >
      <button
          class="btn btn-primary btn-lg"
          style="margin-left:0px;"
          @click="goNewQuestionnaire"
        >
          Ajouter un questionnaire
        </button>
        <br>
        <br>
        <p style="font-size:30px;font-weight:bold;">OU</p>
        <br>
        <br>
        <label for="select" class="form-label" style="font-size: 20px">
          Choisissez un questionnaire:
        </label>
          <select
            v-bind="selected.questionnaire"
            v-model="selected_questionnaire"
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
        <br />
      </div>
      <div>  
        <button
          class="btn btn-primary btn-lg"
          style="margin-left: 0px;margin-top:10px;"
          @click="go_question"
        >
          Ajouter des questions
        </button>
      </div>
    </div>
    <div
      class="btn-group-vertical"
      style="align-items: center; justify-content: center; margin-top: 50px"
      v-if="div_new_questionnaire"
    >
      <div class="mb-3">
        <label for="nom_questionnaire" class="form-label">
          nom du questionnaire
        </label>
        <input
          type="text"
          v-model="nom_questionnaire"
          class="form-control"
          id="nom_questionnaire"
          placeholder="Nom du questionnaire"
        />
        <br />
        <label for="matiere" class="form-label"> Matière </label>
        <input
          type="text"
          v-model="matiere"
          class="form-control"
          id="matiere"
          placeholder="Matière"
        />
        <label for="code" class="form-label"> Code </label>
        <input
          type="text"
          v-model="code"
          class="form-control"
          id="code"
          placeholder="Code"
        />
      </div>
      <br />
      <button class="btn btn-primary btn-lg" @click="send_questionnaire">
        Ajouter
      </button>
    </div>

    <div
      class="btn-group-vertical"
      style="align-items: center; justify-content: center; margin-top: 50px"
      v-if="div_add_question"
    >
      <div class="mb-3">
        <div class="btn-group" role="group" style="padding: 50px">
          <input
            type="radio"
            v-model="type_question"
            class="btn-check"
            name="question_type"
            id="qcm"
            value="qcm"
          />
          <label class="btn btn-outline-primary" for="qcm" @click="show_qcm">
            Question à choix multiples
          </label>
          <input
            type="radio"
            v-model="type_question"
            class="btn-check"
            name="question_type"
            id="libre"
            value="libre"
          />
          <label
            class="btn btn-outline-primary"
            for="libre"
            @click="show_libre"
          >
            Question libre
          </label>
        </div>
        <br />
        <label for="content_question" class="form-label">
          Énoncé de la question
        </label>
        <input
          type="text"
          class="form-control"
          v-model="content_question"
          id="content_question"
          placeholder="Énoncé de la question"
        />
      </div>
      <br />
      <button
        v-if="show_btn_add_choice"
        class="btn btn-primary btn-lg"
        style="margin-left: 0px"
        @click="changeToChoice"
      >
        Ajouter des choix
      </button>
      <button
        v-if="show_btn_add_choice_2"
        class="btn btn-primary btn-lg"
        style="margin-left: 0px"
        @click="send_question_libre"
      >
        Ajouter la question
      </button>
    </div>

    <div
      class="btn-group-vertical"
      style="align-items: center; justify-content: center; margin-top: 50px"
      v-if="div_add_choice"
    >
      <div class="mb-3">
        <label for="choice_answer_contents" class="form-label">
          Choix réponse {{ this.nb_choice }}
        </label>
        <input
          type="text"
          v-model="answer_content"
          class="form-control"
          id="choice_answer_content"
          placeholder="Choix réponse"
        />
        <div class="btn-group" role="group" style="padding: 50px">
          <input
            type="radio"
            v-model="answer_status"
            class="btn-check"
            name="question_type"
            id="vrai"
            value="vrai"
          />
          <label class="btn btn-outline-primary" for="vrai"> Vrai </label>

          <input
            type="radio"
            class="btn-check"
            name="question_type"
            id="faux"
            value="faux"
            @click="reset"
          />
          <label class="btn btn-outline-primary" for="faux"> Faux </label>
        </div>
        <div>
          <button
            class="btn btn-primary btn-lg"
            @click="send_choice"
            style="margin-left: 0px"
          >
            Ajouter le choix
          </button>
        </div>
      </div>
      <br />
      <div class="btn-group-vertical">
        <button
          class="btn btn-primary btn-lg"
          style="margin-top: 30px; margin-left: 0px"
          @click="send_question"
        >
          Passer à une autre question
        </button>
      </div>
    </div>
    <p v-if="error" style="margin-top: 50px; font-size: 40px; color: red">
      Veuillez remplir tout les champs ! !
    </p>
  </div>
</template>
<script>
import NavBar from "../components/NavBarCorr";
export default {
  components: {
    NavBar,
  },
  methods: {
    show_libre() {
      (this.show_btn_add_choice_2 = true), (this.show_btn_add_choice = false);
    },
    show_qcm() {
      (this.show_btn_add_choice_2 = false), (this.show_btn_add_choice = true);
    },
    reset() {
      this.answer_status = "";
    },
    go_question() {
      if (this.selected_questionnaire) {
        this.div_new_questionnaire = false;
        this.div_select_questionnaire = false;
        this.div_add_question = true;
        this.div_add_choice = false;
        this.error = false;
      } else {
        this.error = true;
      }
    },
    goNewQuestionnaire() {
      this.div_new_questionnaire = true;
      this.div_select_questionnaire = false;
      this.div_add_question = false;
      this.div_add_choice = false;
    },
    changeToChoice() {
      if (this.content_question && this.type_question) {
        this.div_new_questionnaire = false;
        this.div_add_question = false;
        this.div_add_choice = true;
        this.error = false;
      } else {
        this.error = true;
      }
    },
    get_questionnaire() {
      const requestOpt = { method: "GET", redirect: "follow" };
      fetch("http://localhost:3000/success/getQuestionnaireList", requestOpt)
        .then((response) => response.text())
        // Sucess
        .then((result) => {
          this.selected.questionnaire = JSON.parse(result);
          console.log(this.selected.questionnaire);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    send_questionnaire() {
      const requestOpt = {
        method: "POST",
        body: JSON.stringify({
          nom_questionnaire: this.nom_questionnaire,
          matiere: this.matiere,
          code:this.code
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
      fetch("http://localhost:3000/success/createQuestionnaire", requestOpt)
        .then((response) => response.text())
        .then((result) => {
          this.selected_questionnaire = result
        })
        .catch((error) => {
          console.log("error", error);
        });
      setTimeout(
        function () {
        if (this.selected_questionnaire) {
          this.div_new_questionnaire = false;
          this.div_select_questionnaire = false;
          this.div_add_question = true;
          this.div_add_choice = false;
          this.error = false;
        } else {
          this.error = true;
        }
        }.bind(this),
        150
      );
      
    },
    fin() {
      this.div_add_question = true;
      this.div_new_questionnaire = false;
      this.div_add_choice = false;
      this.nb_choice = 1;
    },
    send_question() {
      this.div_add_choice = false;
      this.div_add_question = true;
      const requestOpt = {
        method: "POST",
        body: JSON.stringify({
          content_question: this.content_question,
          type_question: this.type_question,
          id_questionnaire: this.selected_questionnaire,
          value_answer: this.value_answer,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
      fetch("http://localhost:3000/success/createQuestion", requestOpt)
        .then((response) => response.text())
        .catch((error) => {
          console.log("error", error);
        });
      this.content_question = "";
      this.value_answer = [];
    },
    send_question_libre() {
      this.div_add_choice = false;
      this.div_add_question = true;
      const requestOpt = {
        method: "POST",
        body: JSON.stringify({
          content_question: this.content_question,
          type_question: this.type_question,
          id_questionnaire: this.selected_questionnaire,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
      fetch("http://localhost:3000/success/createQuestion", requestOpt)
        .then((response) => response.text())
        .catch((error) => {
          console.log("error", error);
        });
      this.content_question = "";
      this.value_answer = [];
    },
    send_choice() {
      this.div_add_choice = true;
      var type = this.answer_status ? true : false;
      if (this.answer_content) {
        this.nb_choice++;
        this.value_answer.push({
          answer_content: this.answer_content,
          answer_status: type,
        });
      } else {
        alert("remplissez les champs");
      }
      this.answer_status = "";
      this.answer_content = "";
    },
  },

  data() {
    return {
      selected: {
        questionnaire: {
          nom_questionnaire: "",
          _id: "",
        },
      },

      selected_questionnaire: "",
      id_questionnaire: "",
      nb_choice: 1,
      answer_status: "",
      answer_content: "",
      value_answer: [],
      content_question: "",
      type_question: "",
      nom_questionnaire: "",
      matiere: "",
      code:"",
      div_add_question: false,
      div_new_questionnaire: false,
      div_select_questionnaire: true,
      div_add_choice: false,
      error: false,
      show_btn_add_choice: false,
      show_btn_add_choice_2: false,
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
