<template>
  <nav id="nav">
    <router-link class="home-link" :to="{ name: 'compare' }">Jämför</router-link>
    <router-link :to="{ name: 'help' }">Hjälp</router-link>
    <router-link :to="{ name: 'about' }">Om</router-link>
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
  background: rgb(48 48 59 / 95%);
  backdrop-filter: blur(5px);
  min-width: 320px;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media screen and (min-width: $size-tablet) {
    backdrop-filter: unset;
    display: initial;
    text-align: center;
    width: 100%;
    position: relative;
    background: transparent;
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

    &:hover {
      @media screen and (min-width: $size-desktop) {
        text-decoration: underline;
      }
    }

    &.router-link-exact-active {
      font-weight: bold;
      color: $brand-color2;
    }
  }

  .home-link {
    // Hide home by default
    display: none;

    @media screen and (min-width: $size-small-tablet) {
      // Display home when there's space
      display: initial;
    }
  }
}
</style>
