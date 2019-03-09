<template>
  <nav id="nav">
    <router-link class="app-byline" :to="{ name: 'compare' }">Jämför</router-link>
    <router-link class="help-link" :to="{ name: 'help' }">Hjälp</router-link>
    <router-link :to="{ name: 'information' }">Om</router-link>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
};
</script>

<style lang="scss" scoped>
#nav {
  position: relative;
  padding: 10px;
  text-align: center;

  a {
    padding: 0.5rem;
    font-weight: bold;
    color: $white;
    text-decoration: none;
    &.router-link-exact-active {
      color: $accent-color;
    }
  }
  @media screen and (min-width: $size-tablet) {
    // Hide help link on non-mobile
    .help-link {
      display: none;
    }
  }
}
</style>
