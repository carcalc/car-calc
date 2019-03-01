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
  text-align: center;

  a {
    padding: 0.5rem;
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: var(--accent-color);
    }
  }
}
</style>
