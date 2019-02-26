<template>
  <footer>
    <p>&copy; 2019 Andreas & Gabriel</p>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  background: rgb(42, 42, 97);
  color: #fff;
}
</style>
