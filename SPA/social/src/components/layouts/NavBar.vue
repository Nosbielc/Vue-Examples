<template>
  <nav :class="cor || 'blue-grey'">
    <div class="nav-wrapper container">
      <a v-bind:href="url || '#/'" class="brand-logo">{{logo || ' '}}</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <slot/>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'NavBar',
    props: ['logo', 'url', 'cor'],
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
