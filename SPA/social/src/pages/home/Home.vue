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

        <card-conteudo-vue v-for="item in listaConteudos" :key="item.id"
                           :imgPerfil="$urlApi + '/full/files/' + item.user.id + '.jpeg'"
                           :nomePerfil="item.user.username" :datePost="item.dateTimePostage"
                           :imgPost="item.imagem"
                           :titlePost="item.title"
                           :commentPost="item.text"
                           countLikes="12359" keyPost="1">
          <card-conteudo-detalhe-vue :comment-post="item.text"
                                     :img-post="item.imagem"
                                     :title-post="item.title">
          </card-conteudo-detalhe-vue>
        </card-conteudo-vue>

<!--        <card-conteudo-vue imgPerfil="https://materializecss.com/images/yuna.jpg"-->
<!--                           nomePerfil="Maria das Graças" datePost="17/02/2020 13:30"-->
<!--                           imgPost="https://materializecss.com/images/sample-1.jpg"-->
<!--                           titlePost="Viagem de Férias"-->
<!--                           commentPost="É um sonho esta em um lugar como esse. Deus é lindo"-->
<!--                           countLikes="12359" keyPost="1">-->
<!--          <card-conteudo-detalhe-vue comment-post="É um sonho esta em um lugar como esse. Deus é lindo"-->
<!--                                     img-post="https://materializecss.com/images/sample-1.jpg"-->
<!--                                     title-post="Viagem de Férias">-->
<!--          </card-conteudo-detalhe-vue>-->
<!--        </card-conteudo-vue>-->
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
      this.perfilData = this.$store.getters.getPerfil;
      this.usuarioSession = this.$store.getters.getUsuario;
      if (this.perfilData) {
        this.perfilData.imagem = this.$urlApi + '/full/files/' + this.$store.getters.getPerfil.id + '.jpeg';
        this.imagem = this.$store.getters.getPerfil.imagem;
        this.username = this.$store.getters.getPerfil.username;
        // Carregando paginas de postagens
        this.loadPostages ();
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
        imagem : '',
      }
    },
    components: {
      SiteTemplate,
      CardConteudoVue,
      CardConteudoDetalheVue,
      PublicarConteudoVue,
      GridVue
    },
    methods: {
      loadPostages () {
        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi + '/postages/all';

        this.$http.get(url,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200 && response.data) {
              this.$store.commit("setConteudosTemp", response.data);
            }
          } )
          .catch( e => {
            console.log("Houve um erro a para listar as postagens")
          } );
      }
    },
    computed: {
      listaConteudos () {
        return this.$store.getters.getConteudosTemp;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
