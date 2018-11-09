import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Donut from 'vue-css-donut-chart';
import Vuelidate from 'vuelidate';
import 'vue-css-donut-chart/dist/vcdonut.css';
import App from './App.vue';
import router from './routes/router';
import store from './store/index';

Vue.filter('transactionType', (value) => {
  switch (value) {
    case 'limit_order_create':
      return 'PLACE ORDER';
    case 'transfer':
      return 'TRANSFER';
    case 'fill_order':
      return 'FILL ORDER';
    case 'limit_order_cancel':
      return 'CANCEL ORDER';
    default:
      break;
  }
  return 'NULL';
});

Vue.config.productionTip = false;

sync(store, router);

Vue.config.ignoredElements = [/^ion-/];

Vue.use(Vuelidate);
Vue.use(Donut);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
