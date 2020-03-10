<template>
  <div class="row">
    <div class="card">
      <div class="card-content">
        <div class="row valign-wrapper">
          <grid-vue size="1">
            <img :src="imgPerfil" :alt="nomePerfil" class="circle responsive-img"> <!-- notice the "circle" class -->
          </grid-vue>
          <grid-vue size="11">
            <span class="black-text">
                 <strong>{{nomePerfil}}</strong> - <small>{{datePost}}</small>
            </span>
          </grid-vue>
        </div>

        <slot/>

      </div>
      <div class="card-action">
        <p class="right-align">
          <a v-on:click="like(keyPost)" class="btn-floating blue-grey pulse">
            <i class="material-icons">{{liked}}</i>
            <span class="blue-grey">{{totalCurtidas}}</span>
          </a>
          <a v-on:click="openComments()" class="btn-floating blue-grey">
            <i class="material-icons">insert_comment</i>
            <span class="blue-grey">{{countComments}}</span>
          </a>
        </p>
        <p v-if="showComments" class="right-align">
          <input type="text" placeholder="Comentar">
          <button class="btn waves-effect waves-light blue-grey">send</button>
        </p>

        <p v-if="showComments">
          <ul class="collection">
            <li class="collection-item avatar">
              <img src="https://materializecss.com/images/yuna.jpg" alt="" class="circle">
              <span class="title">Maria Clara <small> - 12h30 12/02/2020</small></span>
              <p>
                Gostei desse contéudo
              </p>
            </li>
          </ul>
        </p>

      </div>

    </div>
  </div>
</template>

<script>
  import GridVue from "../layouts/GridVue";

  export default {
    name: 'CardConteudoVue',
    props: ['imgPerfil', 'nomePerfil', 'datePost', 'commentPost',
      'countLikes', 'countComments', 'keyPost', 'titlePost', 'imgPost', 'conteudoFull'],
    components: {
      GridVue
    },
    data () {
      return {
        liked : 'favorite_border',
        totalCurtidas : 0,
        showComments : false
      }
    },
    created() {
      // this.getTotalCurtidas (); conteudo hoje já é carregado na requisição de postagens
      // this.isLikePost (); conteudo hoje já é carregado na requisição de postagens
      this.totalCurtidas = this.countLikes;

      let _perfil = this.$store.getters.getPerfil;
      this.conteudoFull.enjoys.forEach( enjoy => {
        if (enjoy.user && enjoy.user.id === _perfil.id) {
              this.liked = 'favorite';
        }
      });

    },
    methods : {
      getTotalCurtidas () {
        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi.concat("/enjoys/enjoy", "/", this.keyPost, "/count");

        this.$http.get(url,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200 && response.data && response.data) {
              this.totalCurtidas = response.data;
            }
          } )
          .catch( e => {
            console.log("Houve um erro a para realizar o getTotalCurtidas no server")
          } );
      },
      isLikePost () {
        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi.concat("/enjoys/enjoy", "/", this.keyPost, "/principal");

        this.$http.get(url,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200) {
              console.log(this.keyPost + " - " + (response.data === true ) );
              if (response.data === true) {
                  this.liked = 'favorite';
              } else {
                  this.liked = 'favorite_border';
              }
            }
          } )
          .catch( e => {
            console.log("Houve um erro a para realizar o getTotalCurtidas no server")
          } );
      },
      like(id) {

        if (this.liked === 'favorite_border') {
          // Ação de realizaro like em um post
          let authStr = 'Bearer '.concat(this.$store.getters.getToken);
          let url = this.$urlApi.concat('/enjoys/enjoy/', id);

          this.$http.post(url,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': authStr
              }
            })
            .then(response => {
              if (response.status === 200) {
                console.log(response);
                this.totalCurtidas = response.data;
                this.liked = 'favorite';
              }
            })
            .catch(e => {
              console.log("Houve um erro ao realizar o like no post")
            });
        } else {
          // Será retirado o like do post
          // Ação de realizaro like em um post
          let authStr = 'Bearer '.concat(this.$store.getters.getToken);
          let url = this.$urlApi.concat('/enjoys/enjoy/', id);

          this.$http.delete(url,
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': authStr
              }
            })
            .then(response => {
              if (response.status === 200) {
                console.log(response);
                this.totalCurtidas = response.data;
                this.liked = 'favorite_border';
              }
            })
            .catch(e => {
              console.log("Houve um erro ao retirar o like no post")
            });
        }

        // if (this.liked === 'favorite') {
        //   this.liked = 'favorite_border';
        // } else {
        //   alert("Like no id: " + id);
        //   this.liked = 'favorite';
        // }
      },
      openComments() {
        this.showComments = !this.showComments;
      }
    }
  }
</script>

<style scoped>

</style>
