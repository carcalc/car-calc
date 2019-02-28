<template>
  <nav id="nav">
    <router-link :to="{ name: 'home' }">Start</router-link>
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
  background-color: rgb(95, 95, 197);

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
