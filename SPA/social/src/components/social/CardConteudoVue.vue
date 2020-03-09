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
      <div class="card-action right-align">
        <p>
          <a v-on:click="like(keyPost)" class="btn-floating blue-grey pulse">
            <i class="material-icons">{{liked}}</i>
            <span class="new badge blue-grey">{{totalCurtidas}}</span>
          </a>
          <a class="btn-floating blue-grey"><i class="material-icons">insert_comment</i></a>
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
      'countLikes', 'keyPost', 'titlePost', 'imgPost'],
    components: {
      GridVue
    },
    data () {
      return {
        liked : 'favorite',
        totalCurtidas: 0
      }
    },
    created() {
      this.getTotalCurtidas ();
      this.isLikePost ();
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
      }
    }
  }
</script>

<style scoped>

</style>
