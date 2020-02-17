<template>
  <span>

      <div v-if="imgPost" class="card-image">
        <img :src="imgPost">
        <span class="card-title">{{titlePost}}</span>
      </div>

      <div v-if="commentPost" class="card-content">
        <p>{{commentPost}}</p>
      </div>

  </span>
</template>

<script>

  export default {
    name: 'CardConteudoDetalheVue',
    props: ['imgPost','titlePost','commentPost',],
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
