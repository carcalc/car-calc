<template>
  <footer>
    <p class="copy">© 2019</p>
    <div class="links">
      <a :href="linkedInAndreas">Andreas<i class="fab fa-linkedin-in"></i></a> &
      <a :href="linkedInGabriel">Gabriel<i class="fab fa-linkedin-in"></i></a>
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
  color: $white;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #232e38;
  @media screen and (min-width: $size-tablet) {
    background: transparent;
  }
  a,
  i {
    text-decoration: none;
    color: $white;
    margin: 4px;
  }
}
</style>
