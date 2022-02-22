<template>
  <div class="register">
    <h1 class="display-3" style="margin-bottom:30px;">Success</h1>
    <nav-bar />
    <h2 style="margin-bottom:20px;margin-top:50px;">Register</h2>
    <div class="btn-group">
      <div class="mb-3">
        <label for="ID_student" class="form-label">Nom d'utilisateur</label>
        <input
          type="text"
          v-model="username"
          class="form-control"
          id="Id_student"
          placeholder="ID"
        />
        <br />
        <label for="PASSWORD" class="form-label">Mot de passe</label>
        <input
          type="password"
          v-model="mdp_student"
          class="form-control"
          id="PASSWORD"
          placeholder="Mot de passe"
        />
        <br>
        <label for="type" class="form-label">Type de compte</label>
       <br> 
         <select
          id="type"
          v-model="type"
          style="margin-top: 20px; font-size: 20px"
        >
          <option
            style="font-size: 20px;"
            value="collab"
          >collab</option>
          <option
            style="font-size: 20px;"
            value="correcteur"
          >correcteur</option>
        </select>
      </div>
    </div>
    <br />
    <div style="margin-top: 50px">
      <button
        class="btn btn-primary btn-lg btn-block"
        style="margin-left: 0px"
        @click="register"
      >
        Ajouter
      </button>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBarCorr";
export default {
  components: {
    NavBar,
  },
  name: "register",
  methods: {
    register() {
      if(this.username && this.mdp_student  && this.type){
        const requestOpt_info = {
          method: "POST",
          body: JSON.stringify({  username: this.username,password:this.mdp_student,type:this.type}),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        };
          fetch(
          "http://localhost:3000/success/register",
          requestOpt_info
        )
          .then((response) => response.text())
          // Sucess
          .catch((error) => {
            console.log("error", error);
          });
      }
      else{
        alert("Remplissez tous les champs")
      }
    },
  },
  data() {
    return {
      errlog: false,
      type:"",
      username: "",
      mdp_student: "",
    };
  },
};
</script>
