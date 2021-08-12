<template>
  <section class="cars-comparison">
    <UsageDetails :usageDetails="usageDetails" />
    <CarSelector @click="setNewCar" />
    <template v-for="(car, index) in cars">
      <transition :key="car.id + index" appear name="bounce">
        <CarDetails
          :key="car.id + index"
          :car="car"
          :usage="usageDetails"
          :governmentGrant="calcOptions.governmentGrant"
          @input="toggleBonus(index)"
        />
      </transition>
    </template>
    <ComparisonResults :usage="usageDetails" :cars="cars" :calcOptions="calcOptions" />
  </section>
</template>

<script>
import defaultData from '@/data/defaults';
import UsageDetails from '@/components/UsageDetails';
import CarSelector from '@/components/CarSelector';
import CarDetails from '@/components/CarDetails';
import ComparisonResults from '@/components/ComparisonResults';

export default {
  name: 'Compare',
  components: {
    UsageDetails,
    CarSelector,
    CarDetails,
    ComparisonResults,
  },
  data() {
    return {
      cars: [],
      usageDetails: {},
      calcOptions: {
        governmentGrant: null,
        // Todo: remove below once grant is a number (that can be 0). Not needed anymore
        isNewCar: [true, true],
      },
    };
  },
  created() {
    this.setDefaults();
    this.getStoredCars();
  },
  methods: {
    setDefaults() {
      this.cars = defaultData.cars;
      this.usageDetails = defaultData.usage;
      this.calcOptions.governmentGrant = defaultData.governmentGrant;
    },
    // Todo: rewrite this to let CarSelector handle state and storage, remove $set methods
    getStoredCars() {
      let cars = [];
      const usage = JSON.parse(localStorage.getItem('usage'));
      if (usage !== null) this.usageDetails = usage;

      this.cars.forEach((car, index) => {
        cars.push(JSON.parse(localStorage.getItem(`car${index}`)));
      });

      if (!cars.includes(null)) {
        this.cars = cars;
      }
    },
    setNewCar({ car, index }) {
      this.$set(this.cars, index, car);
    },
    toggleBonus(index) {
      this.$set(this.calcOptions.isNewCar, index, !this.calcOptions.isNewCar[index]);
    },
  },
};
</script>

<style lang="scss">
.cars-comparison {
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
