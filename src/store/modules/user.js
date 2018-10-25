import * as types from '../types';
import API from '../../services/api';

const initialState = {
  account: null,
  balances: {},
  fetching: false,
  error: false,
};

const mutations = {
  [types.FETCH_USER_REQUEST](state) {
    state.fetching = true;
    state.error = false;
  },
  [types.FETCH_USER_COMPLETE](state, result) {
    state.account = result.account;
    state.balances = result.balances;
    state.fetching = false;
  },
  [types.FETCH_USER_ERROR](state) {
    state.fetching = false;
    state.error = true;
  },
};

/**
 * Function to convert array of balances to object with keys as assets ids
 * @param {Array} balancesArr - array of balance objects
 */
const balancesToObject = (balancesArr) => {
  const obj = {};
  balancesArr.forEach((item) => {
    obj[item.asset_type] = item;
  });
  return obj;
};

const actions = {
  /**
 * Fetches users objects from bitsharesjs-ws
 * @param {string} username - name of user to fetch
 */
  fetchUser: async ({ commit }, nameOrId) => {
    commit(types.FETCH_USER_REQUEST);
    const result = await API.Account.getUser(nameOrId);
    if (result.success) {
      const user = result.data;
      user.balances = balancesToObject(user.balances);
      commit(types.FETCH_USER_COMPLETE, user);
    } else {
      commit(types.FETCH_USER_ERROR);
    }
    return result;
  },

  /**
 * Checks username for existance
 * @param {string} username - name of user to fetch
 */
  checkUsername: async (state, { username }) => new Promise(async (resolve) => {
    const result = await API.Account.getUser(username);
    if (result[0]) resolve(false);
    resolve(true);
  }),
};

const getters = {
  /**
 * Returns current user's name string
 */
  getUserName: ({ account }) => account && account.name,

  /**
 * Returns current user's account object
 */
  getAccountObject: ({ account }) => account,

  /**
 * Returns current users's balances object
 */
  getBalances({ balances }) {
    return balances;
  },

  /**
 * User fetching in progress indicator
 */
  isFetching(state) {
    return state.fetching;
  },

  isError(state) {
    return state.error;
  },

};

export default {
  state: initialState,
  actions,
  getters,
  mutations,
  namespaced: true,
};
