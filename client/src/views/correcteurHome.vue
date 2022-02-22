<template>
  <div class="correcteurHome">
    <h1 class="display-3" style="margin-bottom:30px;">Success</h1>
    <nav-bar />
    <h1 style="margin-top: 50px">Correcteur Home</h1>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <div style="flex-wrap: nowrap" class="row row-3">
            <div style="width:33%" class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-3 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Questionnaires à corrigés</h5>
                      <span class="h2 font-weight-bold mb-0">{{nb_quest}}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon bg-success text-white shadow" style="border-radius:100%;padding: 8px 13px 9px 13px;">
                        <i class="fas fa-calendar-check"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="width:33%" class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-3 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Questionnaires créés</h5>
                      <span class="h2 font-weight-bold mb-0">{{ countQuestionnaire }}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon bg-secondary text-white shadow" style="border-radius:100%;padding: 8px 13px 9px 13px;">
                        <i class="far fa-calendar-plus"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="width:33%" class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-3 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Taux de réussite</h5>
                      <span class="h2 font-weight-bold mb-0">{{taux}}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon bg-danger text-white shadow" style="border-radius:100%;padding: 10px 14px 10px 14px;">
                        <i class="fas fa-percent"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    stats(){
      const requestOptc = {
      method: "GET",
      };
      fetch("http://localhost:3000/success/getStatQuest", requestOptc)
        .then((response) => response.text())
        .then((result) => {
          this.nb_quest = result;
        })
        .catch((error) => {
          console.log("error", error);
        });
      const requestOptb = {
      method: "GET",
      };
      fetch("http://localhost:3000/success/getstat", requestOptb)
        .then((response) => response.text())
        .then((result) => {
          this.taux = result;
        })
        .catch((error) => {
          console.log("error", error);
        });
      const requestOpt = {
      method: "GET",
      };
      fetch("http://localhost:3000/success/countQuestionnaire", requestOpt)
        .then((response) => response.text())
        .then((result) => {
          this.countQuestionnaire = result;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },

  data() {
    return {
      nb_quest:"",
      taux:"",
      countQuestionnaire :"",
    };
  },
  created() {
    if(!this.$store.getters.UserData){
      this.$router.push({ name: 'Login' })   
    }
    console.log(this.$store.getters.UserData._id)
    this.stats()
  },
};
</script>
