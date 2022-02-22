<template>
  <div class="home">
    <h1>Bienvenue sur success !</h1>
    <div class="btn-group">
      <div class="mb-3">
        <label for="ID_student" class="form-label">Your ID:</label>
        <input
          type="text"
          v-model="id_student"
          class="form-control"
          id="Id_student"
          placeholder="ID"
        />
        <br />
        <label for="PASSWORD" class="form-label">Your Password</label>
        <input
          type="password"
          v-model="mdp_student"
          class="form-control"
          id="PASSWORD"
          placeholder="Mot de passe"
        />
      </div>
    </div>
    <br />
    <div style="margin-top: 50px">
      <p v-if="errlog" class="text-danger" style="font-size: 30px">FAUX !</p>
      <button
        class="btn btn-primary btn-lg btn-block"
        style="margin-left: 0px"
        @click="login"
      >
        Connexion
      </button>
      <router-link to="/correcteurHome"
        ><button class="btn btn-primary btn-lg btn-block">
          correcteur
        </button></router-link
      >
      <router-link to="/questionnaireStart"
        ><button class="btn btn-primary btn-lg btn-block">
          student
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    login() {
      if (this.id_student == "student" && this.mdp_student == "student") {
          this.$router.push({ name: "questionnaireStart" });
      } else if (
        this.id_student == "correcteur" &&
        this.mdp_student == "correcteur"
      ) {
          this.$router.push({ name: "correcteurHome" });
      } else {
        this.errlog = true;
      }
    },
  },
  data() {
    return {
      errlog: false,
      id_student: "",
      mdp_student: "",
    };
  },
};
</script>
