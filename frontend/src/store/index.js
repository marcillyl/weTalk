import { createStore } from 'vuex';
const axios = require('axios');
const instance = axios.create({
  baseUrl: 'http://localhost:3000/api/users',
});
let user = localStorage.getItem('user');

if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch {
    user = {
      userId: -1,
      token: '',
    };
  }
}

const store = createStore({
  state: {
    user: user,
  },
  mutations: {
    logUser: function(state, user) {
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
  },
  actions: {
    signIn: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/api/users/signIn', user)
          .then(function(response) {
            commit('logUser', response.data);
            resolve(response);
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },
  },
});

export default store;
