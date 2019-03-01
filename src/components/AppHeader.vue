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
@import url('https://fonts.googleapis.com/css?family=Fredoka+One');
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2rem;
  width: 100%;
  height: 10rem;
  background-color: var(--accent-color);
  color: var(--white);

  h1 {
    margin: 0;
  }
  .app-title,
  .app-byline {
    margin: 0;
    color: var(--white);
    font-family: 'Fredoka One', cursive;
  }
  .app-title {
    font-size: 5rem;
  }
}
</style>
