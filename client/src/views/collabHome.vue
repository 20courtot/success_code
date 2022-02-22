<template>
  <div class="correcteurHome">
      <h1 class="display-3" style="margin-bottom:30px;">Success</h1>
    <nav-bar />
    <h1 style="margin-top: 50px">Collab Home</h1>
    <p>STATS: Taux de réussite totale {{result}}<br>Nombre de questionnaires passés: {{nb_questionnaire}}</p>
    <br>
  </div>
</template>
<script>
import NavBar from "../components/NavBarStud";
export default {
  components: {
    NavBar,
  },
  methods: {
    globalstat(){
     const requestOpt = { method: "POST",
        body: JSON.stringify({
          id_student:this.$store.getters.UserData._id,          
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }, };
      fetch("http://localhost:3000/success/getGlobalStat", requestOpt)
        .then((response) => response.text())
        .then((response) => {
          this.result = response;
        })
        .catch((error) => {
          console.log("error", error);
        });

        const requestOptb = { method: "POST",
        body: JSON.stringify({
          id_student:this.$store.getters.UserData._id,          
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }, };
      fetch("http://localhost:3000/success/getStatCollabQuest", requestOptb)
        .then((response) => response.text())
        .then((response) => {
          this.nb_questionnaire = response;
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  },

  data() {
    return {
      result:"",
      nb_questionnaire:""
    };
  },
  created() {
    this.globalstat()
    if(!this.$store.getters.UserData){
      this.$router.push({ name: 'Login' })   
    }
  },
};
</script>
