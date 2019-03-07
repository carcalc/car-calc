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
  padding-left: 2rem;
  width: 100%;
  height: 10rem;
  color: $white;

  h1 {
    margin: 0;
  }
  .app-title,
  .app-byline {
    margin: 0;
    color: $accent-color;
  }
  .app-title {
    font-size: 3rem;
  }
}
</style>
