<template>
  <nav id="nav">
    <router-link :to="{ name: 'home' }">Jämför</router-link>
    <router-link :to="{ name: 'information' }">Information</router-link>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
};
</script>

<style lang="scss" scoped>
#nav {
  padding: 10px;
  background-color: var(--main-color);

  a {
    padding: 0.5rem;
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #8fbaf3;
    }
  }
}
</style>
