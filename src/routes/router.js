import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/add',
      name: 'add',
      component: () => import(/* webpackChunkName: "add" */ '../views/AddAccount.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import(/* webpackChunkName: "edit" */ '../views/EditAccount.vue'),
    },
    {
      path: '/delete',
      name: 'delete',
      component: () => import(/* webpackChunkName: "delete" */ '../views/DeleteAccount.vue'),
    },
    {
      path: '/balances',
      name: 'balances',
      component: () => import(/* webpackChunkName: "balances" */ '../views/Balances.vue'),
    },
    {
      path: '/transactionsHistory',
      name: 'transactionsHistory',
      component: () => import(/* webpackChunkName: "transactionsHistory" */ '../views/TransactionsHistory.vue'),
    },
  ],
});
