import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    isAdmin: false,
  },
  mutations: {
    updateLoginStatus(state, { isLoggedIn, isAdmin }) {
      state.isLoggedIn = isLoggedIn;
      state.isAdmin = isAdmin;
    },
  },
  actions: {
    checkLoginStatus({ commit }) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const user = localStorage.getItem('currentUser');
      const isAdmin = user === 'admin';
      commit('updateLoginStatus', { isLoggedIn, isAdmin });
    },
    login({ commit }, { user }) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', user);
      const isAdmin = user === 'admin';
      commit('updateLoginStatus', { isLoggedIn: true, isAdmin });
    },
    logout({ commit }) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      commit('updateLoginStatus', { isLoggedIn: false, isAdmin: false });
    },
  },
})

