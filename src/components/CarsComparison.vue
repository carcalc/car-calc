<template>
  <div class="cars-compare-wrapper">
    <UsageDetails v-bind:usageDetails="usageDetails" @change="updateStoredData" />
    <div class="car-wrapper" v-for="(car, index) in selectedCars" v-bind:key="car.id">
      <CarSelector
        v-bind:allCars="allCars"
        v-bind:key="index + 1"
        @selected="setNewCar"
        @change="updateStoredData"
      />
      <CarDetails
        v-bind:car="car"
        v-bind:key="index + car.id"
        v-bind:usageDetails="usageDetails"
        @change="updateStoredData"
      />
    </div>

    <CostComparison :usageDetails="usageDetails" :selectedCars="selectedCars" />
  </div>
</template>

<script>
import defaultData from '@/defaultData.json';
import UsageDetails from '@/components/UsageDetails';
import CarSelector from '@/components/CarSelector';
import CarDetails from '@/components/CarDetails';
import CostComparison from '@/components/CostComparison';
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
      selectedCars: defaultData.cars,
      usageDetails: defaultData.usage,
    };
  },
  created() {
    this.getStoredData();

    // fetch data from firestore
    db.collection('cars')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let car = doc.data();
          car.id = doc.id;
          this.allCars.push(car);
        });
        this.addDefaultsToList();
      });
  },
  updated() {
    console.log('carscomparison updated');
  },
  methods: {
    setNewCar({ car, index }) {
      this.$set(this.selectedCars, index, car);
    },
    addDefaultsToList() {
      defaultData.cars.forEach(car => this.allCars.unshift(car));
    },

    getStoredData() {
      const selectedCars = JSON.parse(localStorage.getItem('selectedCars'));
      if (selectedCars !== null) {
        this.selectedCars = selectedCars;
      }
      const usageDetails = JSON.parse(localStorage.getItem('usageDetails'));
      if (usageDetails !== null) {
        this.usageDetails = usageDetails;
      }
    },
    updateStoredData() {
      localStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
      localStorage.setItem('usageDetails', JSON.stringify(this.usageDetails));
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
