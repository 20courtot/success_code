<template>
    <div class="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" style="padding-top: 50px;">
        <div>
            <h1 class="display-3" style="margin-bottom:10px;">Success</h1>
            <br>
            <br>
            <h2>Portail de connexion</h2>
            <br>
            <br>
            <form @submit.prevent="submit">
                <div class="form-group" style="padding-bottom: 12px;">
                    <label style="font-weight: bold;">Nom d'utilisateur</label>
                    <input v-model="form.username" style="margin-top:20px;" class="form-control" type="text" placeholder="Entrez votre nom d'utilisateur">
                </div>

                <div class="form-group" style="margin-bottom: 30px;">
                    <label style="font-weight: bold;margin-top:20px;">Mot de passe</label>
                    <input v-model="form.password" style="margin-top:20px;" class="form-control" type="password" placeholder="Entrez votre mot de passe">
                </div>

                <div class="d-flex d-lg-flex justify-content-center justify-content-lg-center" style="margin-bottom: 10px;">
                    <button type="submit" style="margin-left:0px;" class="btn btn-primary">Se connecter</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "Login",
        data: function() {
            return {
                form: {}
            }
        },
        computed: {
            isLoggedIn: function() {
                return this.$store.getters.isAuthenticated
            }
        },
        methods: {
            ...mapActions(["LogIn"]),

            async submit() {
                try {
                    await this.LogIn(this.form);

                    switch (this.$store.getters.UserData.type) {
                        case "collab": 
                            this.$router.push("/collabHome");
                            break
                        case "correcteur": 
                            this.$router.push("/correcteurHome")
                            break
                    }
                } catch (error) {
                    alert("Nom d'utilisateur invalide")
                }
            },
        },
        created(){
        },
    }
</script>