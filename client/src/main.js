import store from './store';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'
axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
