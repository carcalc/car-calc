<template>
  <header>
    <h1 class="app-title">CarCalc</h1>
    <h4 class="app-byline">Jämför snabbt och enkelt kostnaderna</h4>
    <HelpMessage />
  </header>
</template>

<script>
import HelpMessage from '@/components/HelpMessage';
export default {
  name: 'AppHeader',

  components: {
    HelpMessage,
  },
};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: $size-tablet) {
    padding: 2rem;
  }
  .app-title,
  .app-byline {
    margin: 0;
    color: $white;
  }
  .app-title {
    font-size: 3rem;
  }
}
</style>
