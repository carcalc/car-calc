<template>
  <div class="cars-compare-wrapper">
    <UsageDetails v-bind:usageDetails="usageDetails" />
    <div class="car-wrapper" v-for="(car, index) in selectedCars" v-bind:key="car.id">
      <CarSelector v-bind:allCars="allCars" v-bind:key="index + 1" @selected="setNewCar" />
      <CarDetails v-bind:car="car" v-bind:key="index + car.id" v-bind:usageDetails="usageDetails" />
    </div>

    <CostComparison :usageDetails="usageDetails" :selectedCars="selectedCars" />
  </div>
</template>

<script>
import UsageDetails from './UsageDetails';
import CarSelector from './CarSelector';
import CarDetails from './CarDetails';
import CostComparison from './CostComparison';
import db from '@/firebase/init';

export default {
  name: 'CarsComparison',
  components: {
    UsageDetails,
    CarSelector,
    CarDetails,
    CostComparison,
  },
  data() {
    return {
      allCars: [], //Maybe move this to CarSelector; this component does not need to be aware of all cars
      selectedCars: [{}, {}],
      usageDetails: [],
    };
  },
  created() {
    // usage details defaults, should probably be a db item too
    this.usageDetails = { gasPrice: 14.3, kwhPrice: 1.5, distance: 1500, ownership: 3 };

    // fetch data from firestore
    db.collection('cars')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let car = doc.data();
          car.id = doc.id;
          car.customized = false;
          this.allCars.push(car);
        });
        this.selectedCars = this.allCars.slice(0, 2); // Populate forms with first two cars in DB
      });
  },
  methods: {
    setNewCar({ car, index }) {
      this.$set(this.selectedCars, index, car);
      // We should save this to local storage
    },
  },
};
</script>

<style lang="scss" scoped>
.cars-compare-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.cars-selector {
}
.car-wrapper {
}
.compare-btn {
  padding: 15px 60px;
  background: rgb(245, 120, 75);
}
</style>
