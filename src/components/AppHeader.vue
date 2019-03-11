<template>
  <header>
    <img class="app-logo" src="../assets/logo.svg" alt="CarCalc" />
    <h4 class="app-byline">Jämför snabbt och enkelt kostnaderna</h4>
    <HelpPopOver />
  </header>
</template>

<script>
import HelpPopOver from '@/components/HelpPopOver';
export default {
  name: 'AppHeader',

  components: {
    HelpPopOver,
  },
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
      padding: 1rem 0;
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
      font-size: 1rem;
    }
  }
}
</style>
