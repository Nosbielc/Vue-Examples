// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from "axios"
import slug from "slug"

Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$urlApi = 'http://localhost:8081'
Vue.prototype.$slugApi = slug

var store = {
  state : {
    usuario :  sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null,
    perfil :  sessionStorage.getItem("perfil")
      ? JSON.parse(sessionStorage.getItem("perfil"))
      : null,
    conteudosTemp : []
  },
  getters : {
    getUsuario: state => {
      return state.usuario;
    },
    getToken : state => {
      return state.usuario.access_token;
    },
    getPerfil: state => {
      return state.perfil;
    },
    getConteudosTemp: state => {
      return state.conteudosTemp;
    }
  },
  mutations : {
    setUsuario(state, n) {
      state.usuario = n;
    },
    setPerfil(state, n) {
      state.perfil = n;
    },
    setConteudosTemp(state, n) {
      state.conteudosTemp = n;
    },
    setPagianacaoConteudosTemp(state, lista) {
      for (let item of lista){
        state.conteudosTemp.push(item);
      }
    }
  }
};

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt, el) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f);
      }
    };
    window.addEventListener('scroll', f);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store : new Vuex.Store(store),
  router,
  components: { App },
  template: '<App/>'
})
