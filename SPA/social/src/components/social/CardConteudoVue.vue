<template>
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
        <a class="btn-floating blue-grey"><i class="material-icons">insert_comment</i></a>
        <a class="btn-floating blue-grey pulse"><i class="material-icons">favorite_border</i></a>
      </p>
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

      }
    }
  }
</script>

<style scoped>

</style>
