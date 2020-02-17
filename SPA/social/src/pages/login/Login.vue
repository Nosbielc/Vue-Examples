<template>
  <login-template>

    <span slot="menuesquerdo">
      <p/>
      <img src="static/img/redessociais.png" class="responsive-img">
    </span>

    <span slot="principal">
      <h1 class="center-align">Login</h1>
      <input type="text" class="email" placeholder="E-mail" value="">
      <input type="password" placeholder="Senha" value="">
      <p/>
      <button type="button" class="btn waves-effect waves-light blue-grey">Entrar</button>
    </span>

  </login-template>
</template>

<script>
  import LoginTemplate from "../../templates/LoginTemplate";

  export default {
    name: 'Login',
    props: [],
    components: {
      LoginTemplate
    },
    data () {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
