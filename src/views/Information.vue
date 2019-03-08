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
  h2,
  p {
    margin-bottom: 1rem;
    color: $white;
  }

  ol {
    color: $accent-color;
    li {
      font-size: 0.8rem;
      padding: 0.5rem 0;
      a {
        font-weight: bold;
        color: $accent-color;
      }
    }
  }
}
</style>
