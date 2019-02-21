<template>
  <div class="cars-compare-wrapper">
    <UsageForm v-bind:pricing="pricing" v-bind:distance="distance"/>
    <div class="car-wrapper" v-for="(car, index) in currentCars" v-bind:key="car.id">
      <CarDetails
        @selected="setNewCar"
        v-bind:key="index + 1"
        v-bind:currentCar="car"
        v-bind:allCars="allCars"
      />
    </div>

    <CostComparison/>
  </div>
</template>

<script>
import UsageForm from './UsageForm';
import CarDetails from './CarDetails';
import CostComparison from './CostComparison';
import db from '@/firebase/init';

export default {
  name: 'CarsComparison',
  components: {
    CarDetails,
    UsageForm,
    CostComparison,
  },
  data() {
    return {
      allCars: [],
      currentCars: [], // We should save this to local storage
      pricing: { gasPrice: 14.3, kWhPrice: 1.5 }, // These should be populated from Firebase
      distance: 1500,
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
        // Populate forms with first two cars in DB
        this.currentCars = this.allCars.slice(2);
      });
  },
  methods: {
    setNewCar({ name, index }) {
      const newCar = this.allCars.find(car => car.name === name);
      this.$set(this.currentCars, index, newCar);
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
