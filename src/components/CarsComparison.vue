<template>
  <section class="cars-comparison-wrapper">
    <UsageDetails :usageDetails="usageDetails" />
    <CarSelector @click="setNewCar" />
    <template v-for="(car, index) in selectedCars">
      <CarDetails
        :car="car"
        :key="'car' + index"
        :usage="usageDetails"
        :evBonus="calcOptions.evBonus"
        @input="toggleBonus(index)"
      />
    </template>
    <CarsResults :usage="usageDetails" :cars="selectedCars" :calcOptions="calcOptions" />
  </section>
</template>

<script>
import defaultData from '@/defaultData.json';
import UsageDetails from '@/components/UsageDetails';
import CarSelector from '@/components/CarSelector';
import CarDetails from '@/components/CarDetails';
import CarsResults from '@/components/CarsResults';

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
      selectedCars: defaultData.cars,
      usageDetails: defaultData.usage,
      calcOptions: { evBonus: defaultData.evBonus, isNewCar: [true, true] },
    };
  },
  created() {
    this.getStoredCars();
  },
  methods: {
    // Todo: rewrite this to let CarSelector handle state and storage, remove $set methods
    getStoredCars() {
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
    setNewCar({ car, index }) {
      this.$set(this.selectedCars, index, car);
    },
    toggleBonus(index) {
      this.$set(this.calcOptions.isNewCar, index, !this.calcOptions.isNewCar[index]);
    },
  },
};
</script>
