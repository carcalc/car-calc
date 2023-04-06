<template>
  <section class="cars-comparison">
    <CardContainer style="grid-area: usage">
      <UsageDetails v-model="usageDetails" />
    </CardContainer>

    <CardContainer style="grid-area: selector">
      <CarSelector @select-car="setCar" />
    </CardContainer>

    <CardContainer
      v-for="(car, index) in cars"
      :key="car.id + index"
      :style="`grid-area: car${index + 1}`"
    >
      <transition appear name="bounce">
        <CarDetails :key="car.id + index" :car="car" :usage="usageDetails" />
      </transition>
    </CardContainer>

    <CardContainer style="grid-area: results">
      <ComparisonResults :usage="usageDetails" :cars="cars" />
    </CardContainer>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CardContainer from '@/components/CardContainer.vue';
import CarDetails from '@/components/CarDetails.vue';
import CarSelector from '@/components/CarSelector.vue';
import ComparisonResults from '@/components/ComparisonResults.vue';
import UsageDetails from '@/components/UsageDetails.vue';
import { defaultUsage, defaultCars } from '@/data';
import type { Car, Usage } from '@/types';

export default defineComponent({
  name: 'CompareCars',
  components: {
    UsageDetails,
    CarSelector,
    CarDetails,
    ComparisonResults,
    CardContainer,
  },
  data(): { cars: Car[]; usageDetails: Usage } {
    return {
      cars: defaultCars,
      usageDetails: defaultUsage,
    };
  },
  watch: {
    usageDetails: {
      handler(newValue) {
        localStorage.setItem('usage', JSON.stringify(newValue));
      },
      deep: true,
    },
    cars: {
      handler() {
        this.cars.forEach((car, index) => localStorage.setItem(`car${index}`, JSON.stringify(car)));
      },
      deep: true,
    },
  },
  async created() {
    this.getLocalStorage();
  },
  methods: {
    getLocalStorage() {
      const usageDetailsJson = localStorage.getItem('usage');

      if (usageDetailsJson) {
        this.usageDetails = JSON.parse(usageDetailsJson);
      }

      for (let index = 0; index < this.cars.length; index++) {
        const carJson = localStorage.getItem(`car${index}`);

        if (carJson) {
          this.cars[index] = JSON.parse(carJson);
        }
      }
    },
    setCar({ car, index }: { car: Car; index: number }) {
      this.cars.splice(index, 1, car);
    },
  },
});
</script>

<style lang="scss">
.cars-comparison {
  display: grid;
  gap: $gutter-xs;
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
    gap: $gutter-sm;
    grid-template:
      'usage usage'
      'selector selector'
      'car1 car2'
      'results results'
      / 1fr 1fr;
  }

  @media screen and (min-width: $size-tablet) {
    gap: $gutter-md;
  }

  @media screen and (min-width: $size-desktop) {
    gap: $gutter-xl;
    grid-template:
      'car1 usage car2'
      'car1 selector car2'
      'results results results'
      / 1fr minmax(auto, 300px) 1fr;
  }
}
</style>
