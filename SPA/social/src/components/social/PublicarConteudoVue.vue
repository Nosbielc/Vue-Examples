<template>
  <div class="row">
    <grid-vue class="input-field" size="12">
      <input type="text" v-model="conteudo.title">
      <textarea v-if="conteudo.title" v-model="conteudo.text"
                placeholder="Conteúdo"
                id="txtConteudoText" class="materialize-textarea"></textarea>
      <input type="text" v-if="conteudo.title && conteudo.text" v-model="conteudo.link" placeholder="Link">
      <input type="text" v-if="conteudo.title && conteudo.text" v-model="conteudo.imagem" placeholder="Url da Imagem">
      <label for="txtConteudoText">O que está acontencendo?</label>
    </grid-vue>
    <p class="right-align">
      <button v-on:click="addConteudo" v-if="conteudo.title && conteudo.text" class="btn waves-effect waves-light blue-grey" size="2 offset-s10">Publicar</button>
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
    created () {
      this.usuarioSession = this.$store.getters.getUsuario;
    },
    data () {
      return {
        usuarioSession : '',
        conteudo : { id : 0, title : '', text : '', link : '', imagem : '' }
      }
    },
    methods : {
      addConteudo () {

        let authStr = 'Bearer '.concat(this.$store.getters.getToken);
        let url = this.$urlApi + '/postages/postage';

        this.$http.post(url,
          JSON.stringify(this.conteudo),
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200) {
              console.log("Post Publicado => " + response.data);
              this.conteudo = { id : 0, title : '', text : '', link : '', imagem : '' };
              this.$store.commit("setConteudosTemp", response.data);
            }
          } )
          .catch( e => {
            console.log("Houve um erro ao publicar um post")
          } );
      }
    }
  }
</script>

<style scoped>

</style>
