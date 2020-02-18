<template>
  <login-template>

    <span slot="menuesquerdo">
      <p/>
      <img src="static/img/redessociais.png" class="responsive-img">
    </span>

    <span slot="principal">

      <span v-if="!cadastro">
        <h1 class="center-align">Login</h1>
        <input type="text" class="email" placeholder="E-mail" value="">
        <input type="password" placeholder="Senha" value="">
        <p/>
        <button id="btnEntrar" class="btn waves-effect waves-light blue-grey">Entrar</button>
        <button id="btnCadastrar"
                class="btn waves-effect waves-light blue-grey"
                v-on:click="cadastro = !cadastro">Cadastre-se</button>
      </span>

      <span v-if="cadastro">
        <h1 class="center-align">Cadastro</h1>
        <input type="text" placeholder="Nome" value="">
        <input type="text" class="email" placeholder="E-mail" value="">
        <input type="password" placeholder="Senha" value="">
        <input type="password" placeholder="Confirme sua Senha" value="">
        <p/>
        <button id="btnEnviar" class="btn waves-effect waves-light blue-grey">Enviar</button>
        <button id="btnJaTenhoConta"
                class="btn waves-effect waves-light blue-grey"
                v-on:click="cadastro = false">Tenho Cadastro</button>
      </span>

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
        cadastro:false
      }
    }
  }
</script>

<style scoped>

</style>
