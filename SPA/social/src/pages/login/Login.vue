<template>
  <login-template>
<!--    <div class="container">-->
      <h1>Login</h1>
      <input type="text" placeholder="E-mail" value="">
      <input type="password" placeholder="Senha" value="">
      <button type="button" class="btn waves-effect waves-light blue-grey">Entrar</button>
<!--    </div>-->
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
