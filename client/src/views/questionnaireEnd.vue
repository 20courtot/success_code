<template>
  <div class="about">
    <nav-bar />
    <div id="roulette">
      <h1>Bravo vous avez fini le questionnaire !!</h1>
      <br>
      <br>
      <h3>{{this.result}}</h3>
      <router-link to="/questionnaireStart" class="btn btn-primary btn-lg btn-block" style="margin-left:0px;">Retourner à l'accueil</router-link>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBarStud";
export default {
  components: {
    NavBar,
  },
  name: "questionnaireEnd",
  data() {
    return {
      result:"",
      id_questionnaire: this.$route.params.id_questionnaire,
    };
  },
  methods: {
    get_result() {
      const requestOpt = {
          method: "POST",
          body: JSON.stringify({"id_questionnaire": this.id_questionnaire}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
      };          
      fetch("http://localhost:3000/success/getScore", requestOpt)               
        .then((response) => response.text())
        .then((result) => {
          this.result = result; 
        })
        .catch((error) => { console.log("error", error); })
        },
    sendPassed_questionnaire() {
      const requestOpt = {
        method: "POST",
        body: JSON.stringify({
          id_questionnaire: this.id_questionnaire,
          id_student: this.$store.getters.UserData._id,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
      fetch("http://localhost:3000/success/createPassed_questionnaire", requestOpt)
        .then((response) => response.text())
        .catch((error) => {
          console.log("error", error);
        });
    },
  },

  created() {
    if(!this.$store.getters.UserData){
      this.$router.push({ name: 'Login' })   
    }
    this.get_result();
    this.sendPassed_questionnaire();
  },
};
</script>
