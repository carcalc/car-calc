<template>
  <div class="cars-compare-wrapper">
    <UsageDetails :usageDetails="usageDetails"/>
    <div class="car-wrapper" v-for="(car, index) in selectedCars" :key="car.id">
      <CarSelector :allCars="allCars" :key="index + 1" @selected="setNewCar"/>
      <CarDetails :car="car" :key="index + car.id" :usageDetails="usageDetails"/>
    </div>
    <CostComparison :usageDetails="usageDetails" :selectedCars="selectedCars"/>
  </div>
</template>

<script>
import defaultData from "@/defaultData.json";
import UsageDetails from "@/components/UsageDetails";
import CarSelector from "@/components/CarSelector";
import CarDetails from "@/components/CarDetails";
import CostComparison from "@/components/CostComparison";
import db from "@/firebase/init";

export default {
  name: "CarsComparison",
  components: {
    UsageDetails,
    CarSelector,
    CarDetails,
    CostComparison
  },
  data() {
    return {
      allCars: [], //Maybe move this to CarSelector; this component does not need to be aware of all cars
      selectedCars: defaultData.cars,
      usageDetails: defaultData.usage
    };
  },
  created() {
    // fetch data from firestore
    db.collection("cars")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let car = doc.data();
          car.id = doc.id;
          car.customized = false;
          this.allCars.push(car);
        });
        this.selectedCars.forEach(car => this.allCars.unshift(car));
      });
  },
  methods: {
    setNewCar({ car, index }) {
      this.$set(this.selectedCars, index, car);
      // We should save this to local storage
    }
  }
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
  transition: all 300ms;
  margin: 2rem;
}
.compare-btn {
  padding: 15px 60px;
  background: rgb(245, 120, 75);
}
</style>
