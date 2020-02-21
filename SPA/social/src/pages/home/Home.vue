<template>
  <site-template>

    <span slot="menuesquerdo">
        <div class="row valign-wrapper">
          <grid-vue size="4">
            <img src="https://materializecss.com/images/yuna.jpg" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
          </grid-vue>
          <grid-vue size="8">
            <span class="black-text">
              <h5>Maria Silva</h5>
              This is a square image. Add the "circle" class to it to make it appear circular.
            </span>
          </grid-vue>
        </div>
    </span>

    <span slot="principal">
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

  </site-template>
</template>

<script>

  import SiteTemplate from "../../templates/SiteTemplate";
  import CardConteudoVue from "../../components/social/CardConteudoVue";
  import CardConteudoDetalheVue from "../../components/social/CardConteudoDetalheVue";
  import PublicarConteudoVue from "../../components/social/PublicarConteudoVue";
  import GridVue from "../../components/layouts/GridVue";

  export default {
    name: 'Home',
    components: {
      SiteTemplate,
      CardConteudoVue,
      CardConteudoDetalheVue,
      PublicarConteudoVue,
      GridVue
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
