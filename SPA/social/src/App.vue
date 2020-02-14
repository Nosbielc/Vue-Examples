<template>
  <span>
    <header>
      <nav-bar cor="blue-grey" logo="Home" url="#"/>
    </header>

    <main>
      <div class="container">
        <router-view/>
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

import NavBar from "./components/layouts/NavBar";
import FooterVue from "./components/layouts/FooterVue";

export default {
  name: 'App',
  components: {
    NavBar,
    FooterVue
  }
}
</script>

<style>
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
