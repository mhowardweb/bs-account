import * as types from '../types';
import API from '../../services/api';

const initialState = {
  wsConnected: false,
  rpcStatus: null,
};

const mutations = {
  [types.WS_CONNECTED](state) {
    state.wsConnected = true;
  },
  [types.WS_DISCONNECTED](state) {
    state.wsConnected = false;
  },
  [types.RPC_STATUS_UPDATE](state, { status }) {
    state.rpcStatus = status;
  },
};

/**
 * Initializes connection to Bitsharesjs-WS
 */
const actions = {
  initConnection: ({ commit, getters }, changeNode) => {
    let active = true;
    const updateConnectionStatus = async (status) => {
      if (!active) return;
      const wsConnected = getters.isWsConnected;
      console.log('Connection status : ', status);
      commit(types.RPC_STATUS_UPDATE, { status });
      if (status === 'error' || status === 'closed') {
        commit(types.WS_DISCONNECTED);
        active = false;
        await API.Connection.disconnect();
        this.initConnection({ commit, getters }, true);
      }
      if (!wsConnected && (status === 'realopen' || status === 'reconnect')) {
        commit(types.WS_CONNECTED);
      }
      if (status === 'realopen') {
        API.ChainListener.enable();
      }
    };

    API.Connection.connect(updateConnectionStatus, changeNode);
  },

};

const getters = {
  /**
 * Is connection ready
 */
  isReady(state) {
    return (state.rpcStatus === 'open' ||
          state.rpcStatus === 'realopen' ||
          state.rpcStatus === 'reconnect') && state.wsConnected;
  },

};


export default {
  state: initialState,
  actions,
  mutations,
  getters,
  namespaced: true,
};
