let _Vue;

class Store {
  constructor(options) {
    const { state = {}, getters = {}, mutations = {}, actions } = options;

    this._state = new _Vue({
      data: {
        state: state,
      },
    });

    this.getters = {};
    this.mutations = {};
    this.actions = {};

    this.forEachGetters(getters, (key, value) => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return value(this.state);
        },
      });
    });

    this.bindMutations(mutations);
    this.bindActions(actions);
  }

  get state() {
    return this._state.state;
  }

  bindMutations(optionMutations) {
    Object.keys(optionMutations).forEach((mutationName) => {
      this.mutations[mutationName] = (payLoad) => {
        optionMutations[mutationName](this.state, payLoad);
      };
    });
  }

  bindActions(optionsActions) {
    Object.keys(optionsActions).forEach((actionName) => {
      this.actions[actionName] = (payLoad) => {
        optionsActions[actionName](this, payLoad);
      };
    });
  }

  commit(mutationName, payLoad) {
    if (this.mutations[mutationName]) {
      this.mutations[mutationName](payLoad);
    } else {
      throw new Error(`mutations上面没有绑定${mutationName}方法`);
    }
  }

  dispatch(actionName, payLoad) {
    this.actions[actionName](payLoad);
  }

  forEachGetters(getters, cb) {
    Object.keys(getters).forEach((key) => {
      cb(key, getters[key]);
    });
  }
}

const install = (v) => {
  _Vue = v;
  v.mixin({
    beforeCreate() {
      const { store = "" } = this.$options;

      if (store) {
        this.$store = store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  });
};

export default { install, Store };
