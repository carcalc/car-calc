<template>
  <footer>
    <div class="wrapper">
      <div class="copy">
        <p>&copy; 2019 Andreas & Gabriel</p>
      </div>
      <div class="text">
        <p>Vid kontakt kan ni nå oss på LinkedIn:</p>
      </div>
      <div class="links">
        <h4>
          Andreas:
          <a :href="linkedInAndreas">
            <i class="fab fa-linkedin-in fa-lg"></i>
          </a>
        </h4>
        &nbsp;&nbsp;
        <h4>
          Gabriel:
          <a :href="linkedInGabriel">
            <i class="fab fa-linkedin-in fa-lg"></i>
          </a>
        </h4>
      </div>
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
  background: rgb(42, 42, 97);
  color: #fff;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
  margin: auto;
}
.links {
  display: flex;
}
i.fab {
  color: #fff;
  cursor: pointer;
}
</style>
