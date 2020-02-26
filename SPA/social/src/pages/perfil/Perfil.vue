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

        <input type="password" placeholder="Nova Senha" class="validate" v-model="atualizaPerfilData.newpassword">
        <input type="password" placeholder="Confirme sua Noava Senha" class="validate" v-model="atualizaPerfilData.newpassword2">

        <div class="file-field input-field">
          <div class="btn waves-effect waves-light blue-grey">
            <span>Imagem</span>
            <input type="file" accept=".jpeg" v-on:change="enviaImagemPerfil">
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
  import Login from "../login/Login";

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
          imagem: '',
          newpassword: '',
          newpassword2: '',
          email: ''
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
              sessionStorage.clear();
              this.$router.push(Login);
            }
          } )
          .catch( e => {
            alert('Houve um erro no cadastro');
          } );
      },
      enviaImagemPerfil ( event ) {

        let imageFile = event.target.files || event.dataTransfer.files;

        if (!imageFile.length) {
          return;
        }

        let reader = new FileReader();
        reader.onloadend = ( event ) => {
          this.atualizaPerfilData.imagem = event.target.result;
        };

        reader.readAsDataURL(imageFile[0]);

      }
    }
  }
</script>

<style scoped>

</style>
