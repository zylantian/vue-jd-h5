const cart = {
  state: {
    count: 0
  },
  getters: {
  },
  actions: {
    AddCart ({ commit }) {
      commit('addToCart')
    }
  },
  // mutations
  mutations: {
    addToCart (state) {
      state.count++
    }
  }
}

export default cart
