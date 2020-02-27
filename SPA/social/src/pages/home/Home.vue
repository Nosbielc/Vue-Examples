<template>
  <site-template>

    <span slot="menuesquerdo">
        <div class="row valign-wrapper">
          <grid-vue size="4">
            <img v-if="imagem" :src="imagem" :alt="username" class="circle responsive-img"> <!-- notice the "circle" class -->
          </grid-vue>
          <grid-vue size="8">
            <span class="black-text">
              <h5 v-if="username">{{username}}</h5>
              Descrição do perfil
            </span>
          </grid-vue>
        </div>
    </span>

    <span slot="principal">
      <publicar-conteudo-vue/>

        <card-conteudo-vue imgPerfil="https://materializecss.com/images/yuna.jpg"
                           nomePerfil="Maria das Graças" datePost="17/02/2020 13:30"
                           imgPost="https://materializecss.com/images/sample-1.jpg"
                           titlePost="Viagem de Férias"
                           commentPost="É um sonho esta em um lugar como esse. Deus é lindo"
                           countLikes="12359" keyPost="1">
          <card-conteudo-detalhe-vue comment-post="É um sonho esta em um lugar como esse. Deus é lindo"
                                     img-post="https://materializecss.com/images/sample-1.jpg"
                                     title-post="Viagem de Férias">
          </card-conteudo-detalhe-vue>
        </card-conteudo-vue>
    </span>

  </site-template>
</template>

<script>

  import SiteTemplate from "../../templates/SiteTemplate";
  import CardConteudoVue from "../../components/social/CardConteudoVue";
  import CardConteudoDetalheVue from "../../components/social/CardConteudoDetalheVue";
  import PublicarConteudoVue from "../../components/social/PublicarConteudoVue";
  import GridVue from "../../components/layouts/GridVue";

  export default {
    name: 'Home',
    created () {
      this.perfilData = JSON.parse(sessionStorage.getItem("perfil"));
      this.usuarioSession = JSON.parse(sessionStorage.getItem("user"));
      if (this.perfilData) {
        this.perfilData.imagem = 'http://localhost:8081/full/files/' + this.perfilData.id + '.jpeg';
        this.imagem = this.perfilData.imagem;
        this.username = this.perfilData.username;
      }
    },
    data () {
      return {
        perfilData: {
          id: 0,
          username: '',
          salary: 0,
          age: 18,
          imagem: '',
          newpassword: '',
          newpassword2: '',
          email: ''
        },
        usuarioSession : '',
        username : '',
        imagem : ''
      }
    },
    components: {
      SiteTemplate,
      CardConteudoVue,
      CardConteudoDetalheVue,
      PublicarConteudoVue,
      GridVue
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*h1, h2 {*/
  /*  font-weight: normal;*/
  /*}*/
  /*ul {*/
  /*  list-style-type: none;*/
  /*  padding: 0;*/
  /*}*/
  /*li {*/
  /*  display: inline-block;*/
  /*  margin: 0 10px;*/
  /*}*/
  /*a {*/
  /*  color: #42b983;*/
  /*}*/
</style>
