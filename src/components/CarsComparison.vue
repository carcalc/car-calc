<template>
  <div class="cars-compare-wrapper">
    <UsageDetails v-bind:usageDetails="usageDetails" />
    <div class="car-wrapper" v-for="(car, index) in currentCars" v-bind:key="car.id">
      <CarDetails
        @selected="setNewCar"
        v-bind:currentCar="car"
        v-bind:key="index + 1"
        v-bind:allCars="allCars"
        v-bind:usageDetails="usageDetails"
      />
    </div>

    <CostComparison :usageDetails="usageDetails" :car1="currentCars[0]" :car2="currentCars[1]" />
  </div>
</template>

<script>
import UsageDetails from './UsageDetails';
import CarDetails from './CarDetails';
import CostComparison from './CostComparison';
import db from '@/firebase/init';

export default {
  name: 'CarsComparison',
  components: {
    CarDetails,
    UsageDetails,
    CostComparison,
  },
  data() {
    return {
      allCars: [],
      currentCars: [],
      usageDetails: [],
    };
  },
  created() {
    // fetch data from firestore
    db.collection('cars')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let car = doc.data();
          car.id = doc.id;
          this.allCars.push(car);
        });
        this.populateOnLoad();
      });
  },
  methods: {
    setNewCar({ car, index }) {
      this.$set(this.currentCars, index, car);
      // We should save this to local storage
    },
    populateOnLoad() {
      // Populate forms with first two cars in DB
      this.currentCars = this.allCars.slice(0, 2);
      this.usageDetails = { gasPrice: 14.3, kwhPrice: 1.5, distance: 1500, ownership: 3 };
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
