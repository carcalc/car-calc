<template>
  <footer>
    <p class="copy">© 2019</p>
    <div class="links">
      <a :href="linkedInAndreas">Andreas<i class="fab fa-linkedin-in fa-lg"></i></a>&
      <a :href="linkedInGabriel">Gabriel<i class="fab fa-linkedin-in fa-lg"></i></a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: ['linkedInAndreas', 'linkedInGabriel'],
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 10rem;
  margin: auto;
  color: $white;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  a,
  i {
    text-decoration: none;
    color: $white;
    margin: 0.5rem;
  }
}
</style>
