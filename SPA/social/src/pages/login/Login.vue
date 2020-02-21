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
  import axios from 'axios';

  export default {
    name: 'Login',
    props: [],
    components: {
      LoginTemplate
    },
    data () {
      return {
        usuario: {email: '', password: ''}
      }
    },
    methods: {
      login(){
        console.log(this.usuario.email + ' - ' + this.usuario.password);
        const params = new URLSearchParams();
        params.append("username", this.usuario.email);
        params.append("password", this.usuario.password);
        params.append("grant_type", "password");

        axios.post('http://localhost:8081/oauth/token',
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
          }
        } )
        .catch( e => {
            alert('Usuario ou Password não estão corretos');
        } );
      }
    }
  }
</script>

<style scoped>

</style>
