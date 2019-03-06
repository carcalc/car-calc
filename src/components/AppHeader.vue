<template>
  <header>
    <h1 class="app-title">CarCalc</h1>
    <h4 class="app-byline">Jämför snabbt och enkelt kostnaderna</h4>
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
  justify-content: center;

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
