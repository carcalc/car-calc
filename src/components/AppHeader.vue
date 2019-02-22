<template>
  <header>
    <h1>Kostnadskollen</h1>
    <h5>Få en snabb jämförelse av kostnaderna vid köp av ny bil</h5>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  width: 100%;
  height: 10rem;
  background: rgb(177, 177, 177);

  text-align: center;
  h1 {
    margin: 0;
  }
}
</style>
