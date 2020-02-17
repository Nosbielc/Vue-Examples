<template>
  <div class="card-panel grey lighten-5 z-depth-1">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'CardMenuVue',
    props: ['badge', 'nome', 'descricao'],
    data () {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
