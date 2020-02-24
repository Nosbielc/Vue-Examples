<template>
  <login-template>

    <span slot="menuesquerdo">
      <p/>
      <img src="static/img/redessociais.png" class="responsive-img">
    </span>

    <span slot="principal">

        <h1 class="center-align">Cadastro</h1>
        <input type="text" placeholder="Nome" v-model="cadastroData.username">
        <input type="text" class="email" placeholder="E-mail" v-model="cadastroData.email">
        <input type="password" placeholder="Senha" v-model="cadastroData.password">
        <input type="password" placeholder="Confirme sua Senha" v-model="cadastroData.password2">
        <p/>
        <button id="btnEnviar" class="btn waves-effect waves-light blue-grey"
                v-on:click="cadastro()">Enviar</button>
        <router-link to="/login" id="btnJaTenhoCadastro"
                class="btn waves-effect waves-light blue-grey">Já Tenho Cadastro</router-link>
    </span>

  </login-template>
</template>

<script>
  import LoginTemplate from "../../templates/LoginTemplate";
  import axios from "axios";
  import Home from "../home/Home";

  export default {
    name: 'Cadastro',
    props: [],
    components: {
      LoginTemplate
    },
    data () {
      return {
        cadastroData: {
          username: '',
          salary: 0,
          age: 18,
          password: '',
          password2: '',
          email: ''
        }
      }
    },
    methods: {
      cadastro () {

        let url = 'http://localhost:8081/cadastros';

        axios.post(url,
          JSON.stringify(this.cadastroData),
    {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json'
            }
          })
          .then( response => {
            if (response.status === 200 && response.data.id) {
              this.login();
            }
          } )
          .catch( e => {
            alert('Houve um erro no cadastro');
          } );
      },
      login () {

        let params = new URLSearchParams();
        params.append("username", this.cadastroData.email);
        params.append("password", this.cadastroData.password);
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
              sessionStorage.setItem("user", JSON.stringify(response.data));
              this.$router.push(Home)
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
