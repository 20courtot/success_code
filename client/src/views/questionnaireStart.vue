<template>
  <div class="questionnaireStart">
    <div id="roulette">
      <h1 class="display-3" style="margin-bottom:30px;">Success</h1>
      <nav-bar/>
      <div
        style="margin-top: 40px; margin-bottom: 40px"
        aria-label="Basic radio toggle button group"
      >
      <label>Choisir un questionnaire</label>
      <br>
        <select
          v-bind="selected.questionnaire"
          @click="show_btn_fonction"
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
      </div>
      <br />
      <div
        v-if="show_btn"
        style="display: flex; justify-content: center; text-align: center"
      >
        <div class="card" style="width: 300px">
          <div class="card-header">
            <h4>{{ selected.questionnaire_info.nom_questionnaire }}</h4>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              C'est un questionnaire de
              {{ selected.questionnaire_info.matiere }}
            </h5>
            <p class="card-text">
              Il y a {{ selected.countQuestion }} questions.
            </p>
            <div style="margin-bottom:20px;">
              <label for="code" class="form-label">code du questionnaire</label>
                <input
                  type="password"
                  v-model="code_verif"
                  class="form-control"
                  id="code"
                />
            </div>  
            <button
              style="margin-left:0px;"
              v-if="show_btn"
              class="btn btn-primary btn-lg"
              @click="go_questionnaire(selected.questionnaire_info.code)"
            >
              Commencer le questionnaire
            </button>
            <div v-if="this.div_code_faux">
              <p class="text-danger" style="font-size: 20px">Le code n'est pas le bon</p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBarStud";
export default {
  components: {
    NavBar,
  },
  methods: {
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
          const requestOpt = {
            method: "POST",
            body: JSON.stringify({
              id_questionnaire: this.id_questionnaire_selected,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          };
          fetch("http://localhost:3000/success/countQuestion", requestOpt)
            .then((response) => response.text())
            // Sucess
            .then((result) => {
              this.selected.countQuestion = result;
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
    go_questionnaire(code) {
        if(code == this.code_verif){
        this.$router.push({
          name: "questionnaires",
          params: { id_questionnaire: this.id_questionnaire_selected },
      });
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      }
      else{
        this.div_code_faux = true
      }
    },
    get_questionnaire() {
          const requestOpt = { method: "POST",
            body: JSON.stringify({
              id_student:this.$store.getters.UserData._id,
              
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }, };
      fetch("http://localhost:3000/success/getPassed_questionnairesList", requestOpt)
        .then((response) => response.text())
        // Sucess
        .then((response) => {
          this.selected.questionnaire = JSON.parse(response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },

  data() {
    return {
      div_code_faux: false,
      code_verif:"",
      show_btn: false,
      id_questionnaire_selected: "",
      selected: {
        countQuestion: "",
        questionnaire: {
          nom_questionnaire: "",
          matiere: "",
          code:"",
          list_questionnaire: "",
          _id: "",
        },
        questionnaire_Past: {
          id_questionnaire: "",
          id_student: "",
        },
        questionnaire_info: {
          nom_questionnaire: "",
          matiere: "",
          code:"",
        },
      },
    };
  },
  created() {
    if(!this.$store.getters.UserData){
      this.$router.push({ name: 'Login' })   
    }
    setTimeout(() => {
      this.get_questionnaire();
    }, 150);
  },
};
</script>
