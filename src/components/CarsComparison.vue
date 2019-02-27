<template>
  <div class="cars-compare-wrapper">
    <UsageDetails :usageDetails="usageDetails" />
    <div class="car-wrapper" v-for="(car, index) in selectedCars" :key="index">
      <CarSelector :allCars="allCars" :key="index + '-select'" @selected="setNewCar" />
      <CarDetails
        :car="car"
        :key="index + '-details'"
        :usageDetails="usageDetails"
        :evBonus="evBonus"
      />
    </div>
    <CostComparison :usageDetails="usageDetails" :cars="selectedCars" :evBonus="evBonus" />
    <input type="button" value="Återställ" @click="resetStoredData" />
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
      evBonus: defaultData.evBonus,
    };
  },
  created() {
    this.fetchCars();
  },
  methods: {
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
          this.allCars.push(...this.sortCars(cars), ...defaultData.cars);
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
.cars-compare-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
