<template>
  <section class="cars-comparison-wrapper">
    <UsageDetails :usageDetails="usageDetails" />
    <div class="car-wrapper" v-for="(car, index) in selectedCars" :key="index">
      <CarSelector
        :allCars="allCars"
        :selectedCar="car"
        :key="index + '-selected'"
        @selected="setNewCar"
      />
      <CarDetails :car="car" :key="index + '-details'" :usage="usageDetails" :evBonus="evBonus" />
    </div>
    <CarsResults :usage="usageDetails" :cars="selectedCars" :evBonus="evBonus" />
    <!-- Find a place to put this fucker -->
    <!-- <input lang="sv" type="button" value="Återställ" @click="resetStoredData" /> -->
  </section>
</template>

<script>
import defaultData from '@/defaultData.json';
import UsageDetails from '@/components/UsageDetails';
import CarSelector from '@/components/CarSelector';
import CarDetails from '@/components/CarDetails';
import CarsResults from '@/components/CarsResults';
import db from '@/firebase/init';

export default {
  name: 'CarsComparison',
  components: {
    UsageDetails,
    CarSelector,
    CarDetails,
    CarsResults,
  },
  data() {
    return {
      allCars: [], //Maybe move this to CarSelector; this component does not need to be aware of all cars
      selectedCars: defaultData.cars,
      usageDetails: defaultData.usage,
      evBonus: defaultData.evBonus,
    };
  },
  created() {
    this.getStores();
    this.fetchCars();
  },
  methods: {
    getStores() {
      let selectedCars = [];
      const usage = JSON.parse(localStorage.getItem('usage'));
      if (usage !== null) this.usageDetails = usage;

      this.selectedCars.forEach((car, index) => {
        selectedCars.push(JSON.parse(localStorage.getItem(`car${index}`)));
      });

      if (!selectedCars.includes(null)) {
        this.selectedCars = selectedCars;
      }
    },
    fetchCars() {
      let cars = [];
      db.collection('cars')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let car = doc.data();
            car.id = doc.id;
            cars.push(car);
          });
          this.allCars.push(...this.sortCars(cars));
          this.allCars.unshift(...defaultData.cars);
        });
    },
    sortCars(cars) {
      return cars.sort((a, b) => a.name.localeCompare(b.name));
    },
    setNewCar({ car, index }) {
      this.$set(this.selectedCars, index, car);
    },
    resetStoredData() {
      localStorage.clear();
      // Implement reset here. Currently only clears local storage
    },
  },
};
</script>

<style lang="scss" scoped>
.cars-comparison-wrapper {
  display: grid;
  grid-gap: var(--card-gap);
  padding: var(--card-gap);
  max-width: 1200px;
  margin: auto;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-areas:
    'usage'
    'car1'
    'car2'
    'results';

  @media screen and (min-width: 650px) {
    // Tablet layout
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'usage usage'
      'car1 car2'
      'results results';
  }
  @media screen and (min-width: 1000px) {
    // Desktop layout
    padding: calc(var(--card-gap) * 2);
    grid-gap: calc(var(--card-gap) * 2);
    grid-template-columns: 2fr 1fr 2fr;
    grid-template-areas:
      'car1 usage car2'
      'results results results';
  }
}
.car-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--white);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
  border: var(--card-border);
  border-radius: var(--card-radius);
  &:first-of-type {
    grid-area: car1;
  }
  &:last-of-type {
    grid-area: car2;
  }
}
</style>
