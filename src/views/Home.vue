<template>
  <div class="home">
    <CarsComparison/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarsComparison from '@/components/CarsComparison.vue';

export default {
  name: 'home',
  components: {
    CarsComparison,
  },
};
</script>
<style lang="scss" scoped></style>
