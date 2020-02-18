<template>
  <login-template>

    <span slot="menuesquerdo">
      <p/>
      <img src="static/img/redessociais.png" class="responsive-img">
    </span>

    <span slot="principal">

        <h1 class="center-align">Cadastro</h1>
        <input type="text" placeholder="Nome" value="">
        <input type="text" class="email" placeholder="E-mail" value="">
        <input type="password" placeholder="Senha" value="">
        <input type="password" placeholder="Confirme sua Senha" value="">
        <p/>
        <button id="btnEnviar" class="btn waves-effect waves-light blue-grey">Enviar</button>
        <router-link to="/login" id="btnJaTenhoCadastro"
                class="btn waves-effect waves-light blue-grey">Já Tenho Cadastro</router-link>
    </span>

  </login-template>
</template>

<script>
  import LoginTemplate from "../../templates/LoginTemplate";

  export default {
    name: 'Cadastro',
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
