<template>
  <span>
    <header>
      <nav-bar cor="blue-grey" logo="Login" url="/login">
        <li v-if="usuario"><router-link to="/home">Home</router-link></li>
        <li v-if="!usuario"><router-link to="/cadastro">Cadastre-se</router-link></li>
        <li v-if="usuario"><a v-on:click="sair()">Sair</a></li>
      </nav-bar>
    </header>

    <main>
      <div class="container">
        <div class="row">
          <grid-vue size="8">
            <card-menu-vue>
              <slot name="menuesquerdo"/>
            </card-menu-vue>
          </grid-vue>
          <grid-vue size="4">
              <slot name="principal"/>
          </grid-vue>
        </div>
      </div>
    </main>

    <footer-vue  cor="blue-grey" logo="Social" descricao="Descrição Basica" ano="2020">
      <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
    </footer-vue>

  </span>
</template>

<script>

  import NavBar from "../components/layouts/NavBar";
  import FooterVue from "../components/layouts/FooterVue";
  import GridVue from "../components/layouts/GridVue";
  import CardMenuVue from "../components/layouts/CardMenuVue";
  import Home from "../pages/home/Home";

  export default {
    name: 'LoginTemplate',
    data () {
      return {
        usuario : false
      }
    },
    components: {
      NavBar,
      FooterVue,
      GridVue,
      CardMenuVue
    },
    created() {
      let userSessionStorage = sessionStorage.getItem("user");
      if (userSessionStorage) {
        this.usuario = JSON.parse(userSessionStorage);
      }
    },
    methods: {
      sair() {
        sessionStorage.clear();
        this.usuario = false;
      }
    }
  }
</script>

<style scoped>
  body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }
</style>
