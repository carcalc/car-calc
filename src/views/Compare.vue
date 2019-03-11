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
  grid-gap: $grid-gap / 6;
  justify-content: center;
  align-content: baseline;
  grid-template:
    'usage'
    'car1'
    'car2'
    'results'
    / 1fr;
  @media screen and (min-width: $size-small-tablet) {
    grid-gap: $grid-gap / 3;
    grid-template:
      'usage usage'
      'car1 car2'
      'results results'
      / 1fr 1fr;
  }

  @media screen and (min-width: $size-tablet) {
    // Tablet layout
    grid-gap: $grid-gap / 2;
    grid-template:
      'usage usage'
      'car1 car2'
      'results results'
      / 1fr 1fr;
  }
  @media screen and (min-width: $size-desktop) {
    // Desktop layout
    grid-gap: $grid-gap;
    grid-template:
      'car1 usage car2'
      'results results results'
      / 1fr auto 1fr;
  }
}

.car-wrapper {
  @include card-style();
  display: grid;
  grid-template-areas: 'selector' 'details';
  position: relative;

  &:first-of-type {
    grid-area: car1;
  }
  &:last-of-type {
    grid-area: car2;
  }
}
</style>
