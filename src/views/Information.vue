<template>
  <div class="information">
    <AboutText />
  </div>
</template>
<script>
import AboutText from '@/components/AboutText.vue';

export default {
  name: 'information',
  components: {
    AboutText,
  },
};
</script>

<style lang="scss">
.information {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  @media screen and (min-width: $size-tablet) {
    padding: 3rem;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 80, 0.3);
    border-radius: $border-radius;
  }
  sup {
    color: $brand-color2;
  }
  h2,
  p {
    margin-bottom: 1rem;
    color: $white;
  }
  a {
    font-weight: bold;
    color: $brand-color2;
  }
  ol {
    color: $brand-color2;
    li {
      font-size: 0.8rem;
      padding: 0.5rem 0;
      margin-left: 1rem;
    }
  }
}
</style>
