<template>
  <span>
    <publicar-conteudo-vue/>

    <card-conteudo-vue imgPerfil="https://materializecss.com/images/yuna.jpg"
      nomePerfil="Maria das Graças" datePost="17/02/2020 13:30"
                       imgPost="https://materializecss.com/images/sample-1.jpg"
                       titlePost="Viagem de Férias"
                       commentPost="É um sonho esta em um lugar como esse. Deus é lindo"
                       countLikes="12359" keyPost="1">
      <card-conteudo-detalhe-vue comment-post="É um sonho esta em um lugar como esse. Deus é lindo"
                                 img-post="https://materializecss.com/images/sample-1.jpg"
                                 title-post="Viagem de Férias">
      </card-conteudo-detalhe-vue>
    </card-conteudo-vue>
  </span>
</template>

<script>
  import CardConteudoVue from "../../components/social/CardConteudoVue";
  import CardConteudoDetalheVue from "../../components/social/CardConteudoDetalheVue";
  import PublicarConteudoVue from "../../components/social/PublicarConteudoVue";

  export default {
    name: 'Home',
    components: {
      CardConteudoVue,
      CardConteudoDetalheVue,
      PublicarConteudoVue
    },
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*h1, h2 {*/
  /*  font-weight: normal;*/
  /*}*/
  /*ul {*/
  /*  list-style-type: none;*/
  /*  padding: 0;*/
  /*}*/
  /*li {*/
  /*  display: inline-block;*/
  /*  margin: 0 10px;*/
  /*}*/
  /*a {*/
  /*  color: #42b983;*/
  /*}*/
</style>
