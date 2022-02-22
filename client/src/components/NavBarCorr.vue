<template>
  <div id="NavBarStud">
      <router-link to="/correcteurHome" class="btn btn-primary btn-lg btn-block" style="margin-left:0px;"><i class="fas fa-home"></i></router-link>
      <router-link to="/create_questionnaire" class="btn btn-primary btn-lg"  style="margin-left:20px;"> Créer un questionnaire</router-link>
      <router-link to="/manage_questionnaire" class="btn btn-primary btn-lg"  style="margin-left:20px;"> Gérer les questionnaires</router-link>
      <router-link to="/correct_questionnaire" class="btn btn-primary btn-lg" style="margin-left:20px;">Corriger les questionnaires</router-link>
      <router-link to="/register" class="btn btn-primary btn-lg" style="margin-left:20px;">Ajouter des utilisateurs</router-link>
      <router-link to="/" class="btn btn-primary btn-lg btn-block" style="margin-left:30px;"><i class="fas fa-sign-out-alt"></i></router-link>
    </div>
</template>

<script>
export default {
  methods:{
  },
  name: 'NavBarStud',
} 
</script>
