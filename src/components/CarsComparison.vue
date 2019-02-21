<template>
  <div class="cars-compare-wrapper">
    <!-- Put UsageForm here -->
    <div class="car-wrapper" v-for="(car, index) in currentCars" v-bind:key="car.id">
      <CarDetails v-bind:key="index + 1" v-bind:currentCar="car" v-bind:allCars="allCars"/>
    </div>

    <!-- Put CostComparisonResult here -->
  </div>
</template>

<script>
import CarDetails from './CarDetails';
import db from '@/firebase/init';

export default {
  name: 'CarsComparison',
  components: {
    CarDetails,
  },
  data() {
    return {
      allCars: [],
      currentCars: [], // We should save this to local storage
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
  mounted() {
    this.$root.$on('selected', selectedCar => {
      this.setCarFromDb(selectedCar);
    });
  },
  methods: {
    setCarFromDb(selectedCar) {
      this.currentCars[0] = this.allCars.filter(car => car.id === selectedCar);
      console;
    },
    // compare() {
    //   // Move all this to CostComparisonResult component
    //   if (this.formDataOne > this.formDataTwo) {
    //     const result = this.formDataOne - this.formDataTwo;
    //     this.output = `Bil 1 är' ${result} kr dyrare än bil 2`;
    //   } else {
    //     const result = this.formDataTwo - this.formDataOne;
    //     this.output = `Bil 2 är ${result} kr dyrare än bil 1 första året`;
    //   }
    // },
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
