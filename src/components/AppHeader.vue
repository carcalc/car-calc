<template>
  <header>
    <router-link :to="{ name: 'compare' }">
      <img class="app-logo" src="../assets/logo.svg" alt="CarCalc logo" />
    </router-link>
    <p class="app-byline">Jämför snabbt och enkelt kostnaderna</p>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .app-logo {
    position: fixed;
    top: 7px;
    left: 8px;
    z-index: 15;
    height: 30px;

    @media screen and (min-width: $size-tablet) {
      height: 80px;
      padding-top: 1rem;
      position: initial;
    }
  }

  .app-byline {
    color: $white;
    position: fixed;
    z-index: 15;
    top: 39px;
    left: 10px;
    font-size: 9px;
    @media screen and (min-width: $size-tablet) {
      position: initial;
      font-size: 1.22rem;
    }
  }
}
</style>
