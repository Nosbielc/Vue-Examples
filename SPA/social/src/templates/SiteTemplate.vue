<template>
  <span>
    <header>
      <nav-bar cor="blue-grey" logo="Home" url="/">
<!--        <li><router-link to="/">Home</router-link></li>-->
        <li><router-link to="/perfil">{{perfilName}}</router-link></li>
        <li v-if="usuario"><a v-on:click="sair()">Sair</a></li>
      </nav-bar>
    </header>

    <main>
      <div class="container">
        <div class="row">
          <grid-vue size="4">
            <card-menu-vue>
              <slot name="menuesquerdo"/>
            </card-menu-vue>
            <card-menu-vue>
              <h3>Amigos</h3>
              <li>João</li>
              <li>Maria</li>
              <li>Jose</li>
            </card-menu-vue>
          </grid-vue>
          <grid-vue size="8">
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
  import Login from "../pages/login/Login";

  export default {
    name: 'SiteTemplate',
    data () {
      return {
        usuario : false,
        perfilName : "Perfil"
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
        this.getDetailUser ();
      } else {
        this.$router.push(Login);
      }
    },
    methods : {
      getDetailUser () {

        let authStr = 'Bearer '.concat(this.usuario.access_token);
        let url = this.$urlApi + '/users/principal';

        this.$http.get(url,
          {
            headers: {
              'Authorization' : authStr
            }
          })
          .then( response => {
            if (response.status === 200 && response.data) {
              // Login Realizado com sucesso
              sessionStorage.setItem("perfil", JSON.stringify(response.data));
              this.perfilName = response.data.username;
            }
          } )
          .catch( e => {
            console.log(e);
            this.$router.push(Login);
          } );
      },
      sair () {
        sessionStorage.clear();
        this.usuario = false;
        this.$router.push(Login);
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
