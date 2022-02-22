<template>
  <div class="correcteurHome">
    <h1 class="display-3" style="margin-bottom:30px;">Success</h1>
    <nav-bar />
    <h1 style="margin-top: 50px">Vos resultats</h1>
    <div v-if="div_select">
      <select
        @click="show_btn"
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
      <br>
      <button style="margin-left:0px;" class="btn btn-primary btn-lg" @click="get_stat_collab" v-if="btn">Choisir</button>
    </div>
    <div v-if="div_result">
      <p>Votre resultat pour ce questionnaire est de {{this.result}}</p>
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
    show_btn(){
      if(this.id_questionnaire_selected){
        this.btn = true
      }
    },
    get_stat_collab() {
      const requestOpt = { method: "POST",
        body: JSON.stringify({
          id_student:this.$store.getters.UserData._id,
          id_questionnaire:this.id_questionnaire_selected,
          
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }, };
      fetch("http://localhost:3000/success/getCollabStat", requestOpt)
        .then((response) => response.text())
        .then((response) => {
          this.result = response;
        })
        .catch((error) => {
          console.log("error", error);
        });
        setTimeout(
        function () {
          this.div_result = true,
          this.div_select = false
        }.bind(this),
        150
      );
    },
    get_questionnaire() {
      const requestOpt = { method: "POST",
        body: JSON.stringify({
          id_student:this.$store.getters.UserData._id,
          
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }, };
      fetch("http://localhost:3000/success/getNotPassed_questionnairesList", requestOpt)
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
      div_select:true,
      div_result:false,
      result:"",
      btn:false,
      id_questionnaire_selected:"",
      selected:{
      questionnaire: {
          nom_questionnaire: "",
          matiere: "",
          code:"",
          list_questionnaire: "",
          _id: "",
        },
    }
    };
  },
  created() {
     this.get_questionnaire()
  },
};
</script>
