<template>
  <span>

      <div v-if="imgPost" class="card-image">
        <a v-if="linkPost" :href="linkPost" target="_blank">
          <img :src="imgPost">
          <span class="card-title">{{titlePost}}</span>
        </a>
      </div>
      <span v-if="!linkPost">
        <img :src="imgPost">
        <span class="card-title">{{titlePost}}</span>
      </span>

      <div v-if="commentPost" class="card-content">
        <p>{{commentPost}}</p>
        <br>
        <a v-if="linkPost && !imgPost" :href="linkPost" target="_blank">Saiba mais</a>
      </div>

  </span>
</template>

<script>

  export default {
    name: 'CardConteudoDetalheVue',
    props: ['imgPost','titlePost','commentPost','linkPost'],
    components: {

    },
    data () {
      return {

      }
    }
  }

</script>

<style scoped>

</style>
