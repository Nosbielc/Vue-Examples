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
            <input type="file" id="file" ref="file" accept=".jpeg,.jpg" v-on:change="handleFileUpload">
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
        imagemPerfil: '',
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
              console.log("Pefil atualizado com sucesso");
              this.submitFile();
              sessionStorage.clear();
              this.$router.push(Login);
            }
          } )
          .catch( e => {
            console.log("Houve um erro na atualização do perfil")
          } );
      },
      submitFile ( event ) {
        let authStr = 'Bearer '.concat(this.usuarioSession.access_token);
        let url = 'http://localhost:8081/storage/perfil';

        /*
        *  Initialize the form data
        */
        let formData = new FormData();

        /*
        *   Add the form data we need to submit
        */
        formData.append('file', this.imagemPerfil);

        axios.post(url,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200) {
              console.log("Imagem de Perfil atualizado")
            }
          } )
          .catch( e => {
            console.log("Imagem de Perfil não foi atualizado")
          } );

      },
      handleFileUpload ( event ) {
        this.imagemPerfil = this.$refs.file.files[0];
      }
    }
  }
</script>

<style scoped>

</style>
