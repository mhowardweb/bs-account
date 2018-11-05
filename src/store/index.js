import Vue from 'vue';
import Vuex from 'vuex';
import uuid from 'uuid/v4';
import VuexPersist from 'vuex-persist';
import connection from './modules/connection';
import user from './modules/user';
import assets from './modules/assets';
import operations from './modules/operations';
import portfolio from './modules/portfolio';
import * as types from './types';

const vuexPersist = new VuexPersist({
  key: 'bsaccount',
  storage: localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    accounts: [],
  },
  mutations: {
    [types.ADD_ACCOUNT]: (state, account) => {
      state.accounts.push(account);
    },
    [types.UPDATE_ACCOUNT]: (state, accounts) => {
      state.accounts = accounts;
    },
    [types.DELETE_ACCOUNT]: (state, accounts) => {
      state.accounts = accounts;
    },
  },
  actions: {
    addAccount({ commit }, account) {
      console.log(account);
      const setId = uuid();
      const saveAccount = { ...account, id: setId };
      commit(types.ADD_ACCOUNT, saveAccount);
    },
    /**
     *
     * copies accounts array, finds account by id and overwrites it.
     * @param {*} account
     */
    updateAccount({ state, commit }, account) {
      const { accounts } = state;
      const index = accounts.findIndex(obj => obj.id === account.id);
      accounts[index] = account;
      commit(types.UPDATE_ACCOUNT, accounts);
    },
    deleteAccount({ state, commit }, account) {
      const { accounts } = state;
      const newAccounts = accounts.filter(obj => obj.id !== account.id);
      commit(types.DELETE_ACCOUNT, newAccounts);
    },
  },
  modules: {
    connection,
    user,
    assets,
    operations,
    portfolio,
  },
});
