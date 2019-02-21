<template>
  <div class="cars-compare-wrapper">
    <UsageDetails v-bind:usageDetails="usageDetails"/>
    <div class="car-wrapper" v-for="(car, index) in currentCars" v-bind:key="car.id">
      <CarDetails
        @selected="setNewCar"
        v-bind:key="index + 1"
        v-bind:currentCar="car"
        v-bind:allCars="allCars"
      />
    </div>

    <CostComparison :usageDetails="usageDetails" :currentCars="currentCars"/>
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
    setNewCar({ name, index }) {
      const newCar = this.allCars.find(car => car.name === name);
      this.$set(this.currentCars, index, newCar);
      // We should save this to local storage
    },
    populateOnLoad() {
      // Populate forms with first two cars in DB
      this.currentCars = this.allCars.slice(0, 2);
      this.usageDetails = { gasPrice: 14.3, kWhPrice: 1.5, distance: 1500 };
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
