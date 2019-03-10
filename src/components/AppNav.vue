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
  position: fixed;
  height: $navheight;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: 10;
  padding: 10px;
  text-align: right;
  background: $black;
  min-width: 320px;
  user-select: none;

  @media screen and (min-width: $size-tablet) {
    width: 100%;
    text-align: center;
    position: relative;
    background: transparent;
    // Hide help link on non-mobile
    .help-link {
      display: none;
    }
  }

  a {
    padding: 0 4px;
    margin-left: 6px;
    color: $white;
    text-decoration: none;
    border: 1px solid $brand-color2;
    border-radius: 4px;

    @media screen and (min-width: $size-tablet) {
      font-weight: bold;
      border: none;
      margin: auto;
    }

    &.router-link-exact-active {
      font-weight: bold;
      color: $brand-color2;
    }
  }
}
</style>
