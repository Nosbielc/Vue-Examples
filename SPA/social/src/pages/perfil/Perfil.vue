<template>
  <site-template>

    <span slot="menuesquerdo">
      <p/>
      <img src="static/img/redessociais.png" class="responsive-img">
    </span>

    <span slot="principal">

        <h1 class="center-align">Perfil</h1>
        <input type="text" placeholder="Nome" v-model="atualizaPerfilData.username" class="validate">

        <input type="email" class="validate" placeholder="E-mail" v-model="atualizaPerfilData.email">
        <span class="helper-text" data-error="E-mail Invalido" data-success=""></span>

        <input type="password" placeholder="Senha Atual" class="validate" v-model="atualizaPerfilData.oldpassword">

        <input type="password" placeholder="Nova Senha" class="validate" v-model="atualizaPerfilData.newpassword">
        <input type="password" placeholder="Confirme sua Noava Senha" class="validate" v-model="atualizaPerfilData.newpassword2">

        <div class="file-field input-field">
          <div class="btn waves-effect waves-light blue-grey">
            <span>Imagem</span>
            <input type="file" accept=".jpeg">
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text">
          </div>
        </div>

        <p/>
        <button id="btnEnviar" class="btn waves-effect waves-light blue-grey"
                v-on:click="atualizaPerfil()">Atualizar</button>
    </span>

  </site-template>
</template>

<script>
  import SiteTemplate from "../../templates/SiteTemplate";
  import axios from "axios";
  import Home from "../home/Home";

  export default {
    name: 'Perfil',
    props: [],
    components: {
      SiteTemplate
    },
    data () {
      return {
        atualizaPerfilData: {
          id: 0,
          username: '',
          salary: 0,
          age: 18,
          oldpassword: '',
          newpassword: '',
          newpassword2: '',
          email: '',
          imagem: ''
        },
        perfilName : "Perfil",
        usuarioSession : ''
      }
    },
    created () {
      this.atualizaPerfilData = JSON.parse(sessionStorage.getItem("perfil"));
      this.usuarioSession = JSON.parse(sessionStorage.getItem("user"));
    },
    methods: {
      atualizaPerfil () {

        let authStr = 'Bearer '.concat(this.usuarioSession.access_token);
        let url = 'http://localhost:8081/users/user/perfil';

        axios.put(url,
          JSON.stringify(this.atualizaPerfilData),
    {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200 && response.data) {
              sessionStorage.setItem("perfil", JSON.stringify(response.data));
              this.$router.push(Home);
            }
          } )
          .catch( e => {
            alert('Houve um erro no cadastro');
          } );
      },
      enviaImagemPerfil () {

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
