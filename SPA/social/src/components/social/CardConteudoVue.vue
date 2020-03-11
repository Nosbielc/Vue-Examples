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
            <span class="badge black-text circle">{{totalCurtidas}}</span>
          </a>
          <a v-on:click="openComments()" class="btn-floating blue-grey pulse">
            <i class="material-icons">insert_comment</i>
            <span class="badge black-text circle">{{countComments}}</span>
          </a>
        </p>
        <p v-if="showComments" class="right-align">
          <input type="text" placeholder="Comentar" v-model="comentPost.text">
          <button v-if="comentPost.text" v-on:click="addComment(keyPost)" class="btn waves-effect waves-light blue-grey">send</button>
        </p>

        <p v-if="showComments">
          <ul class="collection">
            <li class="collection-item avatar" v-for=" item in conteudoFull.expresses">
              <img :src="urlApi + '/full/files/' + item.user.id + '.jpeg'" alt="" class="circle">
              <span class="title">{{ item.user.username }}<small> - {{ item.dateTimeExpress }}</small></span>
              <p>
                  {{ item.text }}
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
        showComments : false,
        urlApi : '',
        comentPost : {
          text : '',
          idPostage : this.keyPost
        }
      }
    },
    created() {
      // this.getTotalCurtidas (); conteudo hoje já é carregado na requisição de postagens
      // this.isLikePost (); conteudo hoje já é carregado na requisição de postagens
      this.urlApi = this.$urlApi;
      this.totalCurtidas = this.countLikes;

      let _perfil = this.$store.getters.getPerfil;
      this.conteudoFull.enjoys.forEach( enjoy => {
        if (enjoy.user && enjoy.user.id === _perfil.id) {
              this.liked = 'favorite';
        }
      });



    },
    methods : {
      addComment (id) {

        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi + '/expresss/express';

        this.$http.post(url,
          JSON.stringify(this.comentPost),
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200) {
              this.conteudoFull.expresses = response.data;
            }
          } )
          .catch( e => {
            console.log("Houve um erro ao publicar um post")
          } );
      },
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
