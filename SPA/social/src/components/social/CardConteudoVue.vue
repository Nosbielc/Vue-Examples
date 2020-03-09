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
          <a v-on:click="like()" class="btn-floating blue-grey pulse">
            <i class="material-icons">{{liked}}</i>
            <span class="new badge blue-grey">12</span>
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
        liked : 'favorite'
      }
    },
    methods : {
      like() {
        if (this.liked === 'favorite') {
          this.liked = 'favorite_border';
        } else {
          this.liked = 'favorite';
        }
      }
    }
  }
</script>

<style scoped>

</style>
