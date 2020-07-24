import Vue from "vue";
import App from "./App.vue";
import Vuex from "./vuex/index";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: "tqh",
    age: 26,
  },
  getters: {
    getName(state) {
      return state.name;
    },
  },
  mutations: {
    add(state, payload) {
      state.age = payload;
    },
  },
  actions: {
    increment(context, payload) {
      setTimeout(() => {
        context.commit("add", payload);
      }, 1000);
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
