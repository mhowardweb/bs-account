import Vue from 'vue';
import * as types from '../types';
import PersistentStorage from '../../services/persistent-storage';
import API from '../../services/api';
import { arrayToObject } from '../../services/api/utils';
import config from '../../services/config';

const initialState = {
  defaultAssetsIds: [],
  assets: {},
  hiddenAssetsIds: [],
  pending: false,
};

const mutations = {
  [types.FETCH_ASSETS_REQUEST](state) {
    state.pending = true;
  },
  [types.FETCH_ASSETS_COMPLETE](state, { assets }) {
    Object.keys(assets).forEach((id) => {
      Vue.set(state.assets, id, assets[id]);
    });
    state.hiddenAssetsIds = PersistentStorage.getJSON('hidden_assets') || [];
    state.pending = false;
  },
  [types.FETCH_ASSETS_ERROR](state) {
    state.pending = false;
  },
  [types.SAVE_DEFAULT_ASSETS_IDS](state, { ids }) {
    state.defaultAssetsIds = ids;
  },
  [types.HIDE_ASSET](state, id) {
    state.hiddenAssetsIds.push(id);
    PersistentStorage.set('hidden_assets', state.hiddenAssetsIds);
  },
  [types.SHOW_ASSET](state, id) {
    state.hiddenAssetsIds.splice(
      state.hiddenAssetsIds.indexOf(id),
      1,
    );
    PersistentStorage.set('hidden_assets', state.hiddenAssetsIds);
  },
};

const fetchAssets2 = async (store, { assets }) => {
  const { commit, getters } = store;
  const currentAssetsIds = Object.keys(getters.getAssets);

  // filter out existing assets
  const filteredAssets = assets.filter(id => currentAssetsIds.indexOf(id) === -1);

  commit(types.FETCH_ASSETS_REQUEST);
  const result = await API.Assets.fetch(filteredAssets);

  if (result) {
  // to remove prefix specified in config (e.x. ".OPEN")
    const prefix = config.removePrefix;
    if (prefix) {
      result.forEach((asset) => {
        if (asset.symbol.substring(0, prefix.length) === prefix) {
          asset.symbol = asset.symbol.slice(prefix.length);
        }
      });
    }

    const composedResult = arrayToObject(result);

    commit(types.FETCH_ASSETS_COMPLETE, { assets: composedResult });
    return composedResult;
  }
  commit(types.FETCH_ASSETS_ERROR);
  return null;
};

const actions = {
/**
 * Fetches assets objects from bitsharesjs-ws
 * @param {Array} assets - list of assets ids/symbold to fetch
 */
  fetchAssets: async (store, { assets }) => {
    const { commit, getters } = store;
    const currentAssetsIds = Object.keys(getters.getAssets);

    // filter out existing assets
    const filteredAssets = assets.filter(id => currentAssetsIds.indexOf(id) === -1);

    commit(types.FETCH_ASSETS_REQUEST);
    const result = await API.Assets.fetch(filteredAssets);

    if (result) {
    // to remove prefix specified in config (e.x. ".OPEN")
      const prefix = config.removePrefix;
      if (prefix) {
        result.forEach((asset) => {
          if (asset.symbol.substring(0, prefix.length) === prefix) {
            asset.symbol = asset.symbol.slice(prefix.length);
          }
        });
      }

      const composedResult = arrayToObject(result);

      commit(types.FETCH_ASSETS_COMPLETE, { assets: composedResult });
      return composedResult;
    }
    commit(types.FETCH_ASSETS_ERROR);
    return null;
  },

  /**
 * Fetches default assets objects via fetchAssets function
 to save default assets ids
 */
  fetchDefaultAssets: async (store) => {
    const { commit } = store;
    const { defaultAssetsNames } = config;
    const assets = await fetchAssets2(store, { assets: defaultAssetsNames });
    if (assets) {
      const ids = Object.keys(assets);
      commit(types.SAVE_DEFAULT_ASSETS_IDS, { ids });
    }
  },

  hideAsset: async ({ commit }, assetId) => {
    commit(types.HIDE_ASSET, assetId);
  },

  showAsset: async ({ commit }, assetId) => {
    commit(types.SHOW_ASSET, assetId);
  },

};

const getters = {
  /**
 * Returns object with all assets
 */
  getAssets({ assets }) {
    return assets || {};
  },

  /**
 * Returns array with default assets ids
 */
  getDefaultAssetsIds({ defaultAssetsIds }) {
    return defaultAssetsIds;
  },

  /**
 * Returns function to get asset by id
 */
  getAssetById({ assets }) {
    return id => ((assets && assets[id]) ? assets[id] : {
      symbol: '...',
      precision: 1,
    });
  },

  getHideList({ hiddenAssetsIds }) {
    return hiddenAssetsIds;
  },

};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
  namespaced: true,
};
