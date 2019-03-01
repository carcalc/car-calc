<template>
  <header>
    <h1>Elbil eller Fossildriven?</h1>
    <h4>- jämför snabbt och enkelt kostnaderna -</h4>
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
  align-items: center;
  width: 100%;
  height: 10rem;
  background-color: var(--accent-color);
  color: var(--white);

  h1 {
    margin: 0;
  }
}
</style>
