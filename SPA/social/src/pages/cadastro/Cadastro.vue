<template>
  <login-template>

    <span slot="menuesquerdo">
      <p/>
      <img src="static/img/redessociais.png" class="responsive-img">
    </span>

    <span slot="principal">

        <h1 class="center-align">Cadastro</h1>
        <input type="text" placeholder="Nome" v-model="cadastroData.username" class="validate">

        <input type="email" class="validate" placeholder="E-mail" v-model="cadastroData.email">
        <span class="helper-text" data-error="E-mail Invalido" data-success=""></span>

        <input type="password" placeholder="Senha" class="validate" v-model="cadastroData.password">
        <input type="password" placeholder="Confirme sua Senha" class="validate" v-model="cadastroData.password2">
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

        let url = this.$urlApi + '/cadastros';

        this.$http.post(url,
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
