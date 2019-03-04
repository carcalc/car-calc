<template>
  <nav id="nav">
    <router-link class="app-byline" :to="{ name: 'home' }">Jämför</router-link>
    <router-link :to="{ name: 'information' }">Om</router-link>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Fredoka+One');
#nav {
  position: relative;
  padding: 10px;
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
