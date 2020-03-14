<template>
  <site-template>

    <span slot="menuesquerdo">
        <div class="row valign-wrapper">
          <grid-vue size="4">
            <router-link :to="'/pagina/'+this.idUsuarioPagina">
              <img v-if="imagem" :src="imagem" :alt="username" class="circle responsive-img"> <!-- notice the "circle" class -->
            </router-link>
          </grid-vue>
          <grid-vue size="8">
            <span class="black-text">
              <router-link :to="'/pagina/'+this.idUsuarioPagina">
                <h5 v-if="username" class="black-text">{{username}}</h5>
              </router-link>
              <button v-if="showBtnSeguir" v-on:click="friend" class="btn">{{descBtnSeguir}}</button>
            </span>
          </grid-vue>
        </div>
    </span>

    <span slot="menuesquerdoamigos">
      <h4>Seguindo</h4>
      <li v-for="amigo in listaAmigos">
         <router-link :to="'/pagina/'+amigo.userFriend.id" class="black-text">
           {{amigo.userFriend.username}}
         </router-link>
      </li>
      <li v-if="!listaAmigos.length">Nenhum Usuário</li>
    </span>

    <span slot="principal" class="box">
      <publicar-conteudo-vue/>

        <card-conteudo-vue v-for="item in listaConteudos" :key="item.id"
                           :imgPerfil="$urlApi + '/full/files/' + item.user.id + '.jpeg'"
                           :nomePerfil="item.user.username" :datePost="item.dateTimePostage"
                           :imgPost="item.imagem"
                           :titlePost="item.title"
                           :commentPost="item.text"
                           :countLikes="item.enjoys.length"
                           :countComments="item.expresses.length"
                           :keyPost="item.id"
                           :conteudo-full="item">
          <card-conteudo-detalhe-vue :comment-post="item.text"
                                     :img-post="item.imagem"
                                     :title-post="item.title"
                                     :link-post="item.link">
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
      <!--      <div v-scroll="handleScroll" v-if="!listaconteudoLocal.last" class="center-align">-->
      <!--        <button v-on:click="loadPagination" class="btn waves-effect waves-light blue-grey">Mais ...</button>-->
      <!--      </div>-->
      <!--      <div v-else class="center-align">//com esse linha o só é mostrado a piga que esta solicitando-->
      <!--        <button v-on:click="loadPostages(0)" class="btn waves-effect waves-light blue-grey">Inicio</button>-->
      <!--      </div>-->
          <div v-scroll="handleScroll">

          </div>

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
    name: 'Pagina',
    created () {

      this.idUsuarioPagina = this.$route.params.id;
      this.perfilData = this.$store.getters.getPerfil;
      this.usuarioSession = this.$store.getters.getUsuario;
      if (this.perfilData) {
        this.loadAmigos(this.idUsuarioPagina);
        if (this.perfilData.id != this.idUsuarioPagina) {
          this.showBtnSeguir = true;
        }
        this.loadPerfilPagina(this.$route.params.id);
        this.perfilData.imagem = this.$urlApi + '/full/files/' + this.$store.getters.getPerfil.id + '.jpeg';
        // Carregando paginas de postagens
        this.loadPostages (0);
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
        email : '',
        idUsuarioPagina : 0,
        listaconteudoLocal: '',
        stopScroll: false,
        showBtnSeguir: false,
        descBtnSeguir: 'Seguir',
        listaAmigos: []
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
      handleScroll() {
        // console.log("scrollY: " + window.scrollY);
        // console.log("clientHeight: " + document.body.clientHeight);
        let scrolly = window.scrollY;
        let tela = document.body.clientHeight;
        if ((tela - (tela * 0.20)) <= scrolly && !this.stopScroll) {
          // console.log("Fazendo atualização");
          this.stopScroll = true;
          this.loadPagination();
        }
      },
      loadPagination() {
        if (!this.listaconteudoLocal.last) {
          let totalPages = this.listaconteudoLocal.totalPages - 1 ;
          let pageCurrent = parseInt(this.listaconteudoLocal.number);
          let pageSelection = 0;
          if (pageCurrent >= totalPages) {
            pageSelection = 0;
          } else {
            pageSelection = ++pageCurrent;
          }
          this.loadPostages(pageSelection);
        }
      },
      loadPerfilPagina (id) {
        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi + '/users/user/' + id;

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
              this.imagem = this.$urlApi + '/full/files/' + response.data.id + '.jpeg';
              this.username = response.data.username;
              this.email = response.data.email;
              this.idUsuarioPagina = response.data.id;
            }
          } )
          .catch( e => {
            console.log("Houve um erro a para listar as postagens")
          } );
      },
      loadPostages (pag) {
        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi + '/postages/' + this.$route.params.id + '?pag=' + pag;

        this.$http.get(url,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200 && response.data && response.data.content) {
              if (pag === 0) {
                this.$store.commit("setConteudosTemp", '');
                this.$store.commit("setConteudosTemp", response.data.content); //com esse linha o só é mostrado a piga que esta solicitando
              } else {
                this.$store.commit("setPagianacaoConteudosTemp", response.data.content);
              }
              this.listaconteudoLocal = response.data;
              this.stopScroll = false;
            }
          } )
          .catch( e => {
            console.log("Houve um erro a para listar as postagens")
          } );
      },
      friend() {
        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi + '/friends/friend/' + this.idUsuarioPagina;

        console.log(url);

        this.$http.post(url,
          '',
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200) {
              this.loadAmigos(this.idUsuarioPagina);
            }
          } )
          .catch( e => {
            console.log("Houve um erro ao seguir")
          } );
      },
      loadAmigos (idDono) {
        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi + '/friends/friend/' + idDono;

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
              this.listaAmigos = response.data;
              this.testAmigo();
            }
          } )
          .catch( e => {
            console.log("Houve um erro a para listar amigos")
          } );
      },
      testAmigo() {
        for( let amigo of this.listaAmigos) {
          if (amigo.userFriend.id == this.perfilData.id) {
            this.descBtnSeguir = 'Deixar de Seguir';
            break;
          }
        }
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
  .box {
    transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
  }
</style>

