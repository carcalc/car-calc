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
  grid-gap: 3px;
  justify-content: center;
  align-content: baseline;
  grid-template-columns: 1fr;
  grid-template-areas:
    'usage'
    'car1'
    'car2'
    'results';

  @media screen and (min-width: $size-tablet) {
    // Tablet layout
    grid-gap: $grid-gap;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'usage usage'
      'car1 car2'
      'results results';
  }
  @media screen and (min-width: $size-desktop) {
    // Desktop layout
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas:
      'car1 usage car2'
      'results results results';
  }
}

.car-wrapper {
  @include card-style();

  display: grid;
  grid-template-areas: 'selector' 'details';

  &:first-of-type {
    grid-area: car1;
  }
  &:last-of-type {
    grid-area: car2;
  }
}
</style>
