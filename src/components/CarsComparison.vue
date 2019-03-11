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
      <CarDetails
        :car="car"
        :key="index + '-details'"
        :usage="usageDetails"
        :evBonus="calcOptions.evBonus"
        @input="toggleBonus(index)"
      />
    </div>
    <CarsResults :usage="usageDetails" :cars="selectedCars" :calcOptions="calcOptions" />
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
      calcOptions: { evBonus: defaultData.evBonus, isNewCar: [true, true] },
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
    toggleBonus(index) {
      this.calcOptions.isNewCar[index] = !this.calcOptions.isNewCar[index];
    },
    resetStoredData() {
      localStorage.clear();
      // Implement reset here. Currently only clears local storage
    },
  },
};
</script>
