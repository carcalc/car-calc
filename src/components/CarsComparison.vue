<template>
  <div class="cars-compare-wrapper">
    <UsageDetails v-bind:usageDetails="usageDetails" />
    <div class="car-wrapper" v-for="(car, index) in selectedCars" v-bind:key="car.id">
      <CarSelector v-bind:allCars="allCars" v-bind:key="index + '-select'" @selected="setNewCar" />
      <CarDetails
        v-bind:car="car"
        v-bind:key="index + '-details'"
        v-bind:usageDetails="usageDetails"
      />
    </div>
    <CostComparison :usageDetails="usageDetails" :selectedCars="selectedCars" />
    <input type="button" value="Återställ" @click="resetAllData" />
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
  methods: {
    setNewCar({ car, index }) {
      this.$set(this.selectedCars, index, car);
    },
    addDefaultsToList() {
      defaultData.cars.forEach(car => this.allCars.unshift(car));
    },

    getStoredData() {
      // Fetch data from localStorage that is saved by the components themselves.
      let selectedCars = [];
      const usageDetails = JSON.parse(localStorage.getItem('usageDetails'));

      this.selectedCars.forEach((car, index) => {
        selectedCars.push(JSON.parse(localStorage.getItem(`car${index}`)));
      });

      if (!selectedCars.includes(null)) {
        this.selectedCars = selectedCars;
      }

      if (usageDetails !== null) {
        this.usageDetails = usageDetails;
      }
    },
    resetAllData() {
      localStorage.clear();

      // Implement reset here. Currently only clears local storage
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
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 80, 0.15);
  margin: 2rem;
}
.compare-btn {
  padding: 15px 60px;
  background: rgb(245, 120, 75);
}
</style>
