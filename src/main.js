import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './routes/router';
import store from './store/index';

Vue.config.productionTip = false;

sync(store, router);

Vue.config.ignoredElements = [/^ion-/];

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
