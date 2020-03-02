<template>
  <login-template>

    <span slot="menuesquerdo">
      <p/>
      <img src="static/img/redessociais.png" class="responsive-img">
    </span>

    <span slot="principal">

      <h1 class="center-align">Login</h1>
      <input type="text" class="email" placeholder="E-mail" v-model="usuario.email">
      <input type="password" placeholder="Senha" v-model="usuario.password">
      <p/>
      <button id="btnEntrar" class="btn waves-effect waves-light blue-grey"
              v-on:click="login()">Entrar</button>
      <router-link to="/cadastro" id="btnCadastrar"
              class="btn waves-effect waves-light blue-grey">Cadastre-se</router-link>

    </span>

  </login-template>
</template>

<script>
  import LoginTemplate from "../../templates/LoginTemplate";
  import Home from "../home/Home";

  export default {
    name: 'Login',
    props: [],
    components: {
      LoginTemplate
    },
    created() {
      this.$store.commit('setPerfil', null);
      this.$store.commit('setUsuario', null);
      sessionStorage.clear();
    },
    data () {
      return {
        usuario: {email: '', password: ''}
      }
    },
    methods: {
      login () {

        let params = new URLSearchParams();
        params.append("username", this.usuario.email);
        params.append("password", this.usuario.password);
        params.append("grant_type", "password");

        this.$http.post(this.$urlApi + '/oauth/token',
          params
        ,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept' : 'application/json',
            'Authorization' : 'Basic YXBpYmFja2VuZC1jbGllbnQ6YXBpYmFja2VuZC1zZWNyZXQ='
          }
        })
        .then( response => {
          if (response.status === 200 && response.data.access_token) {
            // Login Realizado com sucesso
            this.$store.commit('setUsuario', response.data);
            sessionStorage.setItem("user", JSON.stringify(response.data));
            // this.$router.push(Home)
            this.getDetailUser ();
          }
        } )
        .catch( e => {
            alert('Usuario ou Password não estão corretos');
        } );
      },
      getDetailUser () {

        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi + '/users/principal';

        this.$http.get(url,
          {
            headers: {
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200 && response.data) {
              // Login Realizado com sucesso
              this.$store.commit('setPerfil', response.data);
              sessionStorage.setItem("perfil", JSON.stringify(response.data));
              this.$router.push(Home);
            }
          } )
          .catch( e => {
            console.log(e);
            this.$router.go(0);
          } );
      }
    }
  }
</script>

<style scoped>

</style>
