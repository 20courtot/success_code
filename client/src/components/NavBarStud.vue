<template>
    <div id="NavBarStud">
        <router-link to="/collabHome"><button class="btn btn-primary btn-lg btn-block" style="margin-left:0px;"><i class="fas fa-home"></i></button></router-link>
        <router-link to="/QuestionnaireStart" class="btn btn-primary btn-lg" style="margin-left:20px;">Passer des questionnaires</router-link>
        <router-link to="/collabResult" class="btn btn-primary btn-lg" style="margin-left:20px;">Voir mes resultats</router-link>   
        <router-link to="/"><button @click="disconnect" class="btn btn-primary btn-lg btn-block" style="margin-left:30px;"><i class="fas fa-sign-out-alt"></i></button></router-link>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
      ...mapActions(["LogOut"]),

      disconnect: function() {
          this.LogOut()
          this.$router.push({ name: 'Login' })
      }
  },
  name: 'NavBarStud',
} 
</script>
