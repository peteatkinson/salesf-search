import { search } from "../client/search";
import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    isPending: false,
    isError: false,
    query: null,
  },
  getters: {
    products(state) {
      return state.products;
    },
    isPending(state) {
      return state.isPending;
    },
    isError(state) {
      return state.isError;
    },
    query(state) {
      return state.query;
    },
  },
  mutations: {
    ["STORE_REQUEST"]: (state, query) => {
      state.isPending = true;
      state.query = query;
    },
    ["STORE_SUCCESS"]: (state, products) => {
      state.isPending = false;
      state.isError = false;
      state.products = [...products.data.products];
    },
    ["STORE_FAILURE"]: (state) => {
      state.isPending = false;
      state.isError = true;
    },
  },
  actions: {
    async update({ commit }, query, limit, page) {
      commit("STORE_REQUEST", query);

      await search(
        { query, limit, page },
        (products) => commit("STORE_SUCCESS", products),
        () => commit("STORE_FAILURE")
      );
    },
    /* Should... probably... use... actions... long live Redux!! */
  },
  modules: {},
});
