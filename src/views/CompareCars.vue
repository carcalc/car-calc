<template>
  <section class="cars-comparison">
    <UsageDetails v-model="usageDetails" />
    <CarSelector @select-car="setCar" />
    <template :key="car.id + index" v-for="(car, index) in cars">
      <transition appear name="bounce">
        <CarDetails :key="car.id + index" :car="car" :usage="usageDetails" />
      </transition>
    </template>
    <ComparisonResults :usage="usageDetails" :cars="cars" />
  </section>
</template>

<script lang="ts">
import { defaultUsage, defaultCars } from '@/data';
import UsageDetails from '@/components/UsageDetails.vue';
import CarSelector from '@/components/CarSelector.vue';
import CarDetails from '@/components/CarDetails.vue';
import ComparisonResults from '@/components/ComparisonResults.vue';
import type { Car, Usage } from '@/types';

export default {
  name: 'CompareCars',
  components: {
    UsageDetails,
    CarSelector,
    CarDetails,
    ComparisonResults,
  },
  data(): { cars: Car[]; usageDetails: Usage } {
    return {
      cars: defaultCars,
      usageDetails: defaultUsage,
    };
  },
  async created() {
    this.getLocalStorage();
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
};
</script>

<style lang="scss">
.cars-comparison {
  display: grid;
  gap: 4px;
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
    gap: 8px;
    grid-template:
      'usage usage'
      'selector selector'
      'car1 car2'
      'results results'
      / 1fr 1fr;
  }

  @media screen and (min-width: $size-tablet) {
    gap: 12px;
  }

  @media screen and (min-width: $size-desktop) {
    gap: 24px;
    grid-template:
      'car1 usage car2'
      'car1 selector car2'
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
