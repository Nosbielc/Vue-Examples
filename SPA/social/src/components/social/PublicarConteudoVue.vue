<template>
  <div class="row">
    <grid-vue class="input-field" size="12">
      <textarea v-model="txtAreaConteudo" id="txtAreaConteudo" class="materialize-textarea"></textarea>
      <label for="txtAreaConteudo">O que está acontencendo?</label>
    </grid-vue>
    <p>
      <grid-vue v-if="txtAreaConteudo" class="btn waves-effect waves-light blue-grey" size="2 offset-s10">Publicar</grid-vue>
    </p>
  </div>
</template>

<script>
  import GridVue from "../layouts/GridVue";

  export default {
    name: 'PublicarConteudoVue',
    props: [],
    components: {
      GridVue
    },
    data () {
      return {
        txtAreaConteudo:'',
      }
    }
  }
</script>

<style scoped>

</style>
