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
  .app-title {
    font-size: 2.5rem;
  }
  .app-title,
  .app-byline {
    color: $white;
  }
  @media screen and (min-width: $size-tablet) {
    align-items: stretch;
    .app-title {
      font-size: 3rem;
    }
  }
}
</style>
