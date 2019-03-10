<template>
  <header>
    <h1 class="app-title">CarCalc</h1>
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;

  @media screen and (min-width: $size-tablet) {
    position: initial;
    align-items: stretch;
  }

  .app-title {
    color: $white;
    position: fixed;
    top: 17px;
    left: 4px;
    line-height: 0;
    z-index: 15;
    font-style: italic;
    font-size: 24px;
    font-weight: 600;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: $white;
    @media screen and (min-width: $size-tablet) {
      line-height: initial;
      font-size: 2.5rem;
      position: initial;
      font-size: 4rem;
      font-weight: 800;
      -webkit-text-stroke-width: 2px;
    }
  }

  .app-byline {
    color: $white;
    position: fixed;
    z-index: 15;
    top: 29px;
    left: 7px;
    font-size: 8px;
    @media screen and (min-width: $size-tablet) {
      position: initial;
      font-size: 1rem;
    }
  }
}
</style>
