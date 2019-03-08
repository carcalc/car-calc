<template>
  <div class="information">
    <About />
  </div>
</template>
<script>
import About from '@/components/About.vue';

export default {
  name: 'home',
  components: {
    About,
  },
};
</script>

<style lang="scss" scoped>
.information {
  max-width: 600px;
  margin: auto;
}
</style>
