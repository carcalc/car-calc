<template>
  <CarsComparison />
</template>

<script>
import CarsComparison from '@/components/CarsComparison.vue';

export default {
  name: 'home',
  components: {
    CarsComparison,
  },
};
</script>

<style lang="scss">
.cars-comparison-wrapper {
  display: grid;
  gap: $gap / 6;
  justify-content: center;
  align-content: baseline;
  grid-template:
    'usage'
    'car1'
    'selector'
    'car2'
    'results'
    / 1fr;
  @media screen and (min-width: $size-small-tablet) {
    gap: $gap / 3;
    grid-template:
      'usage usage'
      'selector selector'
      'car1 car2'
      'results results'
      / 1fr 1fr;
  }

  @media screen and (min-width: $size-tablet) {
    // Tablet layout
    gap: $gap / 2;
  }
  @media screen and (min-width: $size-desktop) {
    // Desktop layout
    gap: $gap;
    grid-template:
      'car1 usage car2' 1fr
      'car1 selector car2' auto // Todo: make this look less weird. It's too stretched
      'results results results'
      / 1fr minmax(auto, 300px) 1fr;
  }

  .car-details {
    grid-area: car1;
    &:last-of-type {
      grid-area: car2;
    }
  }
}
</style>
