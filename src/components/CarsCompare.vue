<template>
  <div class="cost-compare-wrapper">
    <!-- vi bör flytta ut körsträcka etc hit!  -->
    <div class="cars-compare-wrapper" v-for="(car, index) in currentCars" v-bind:key="car.id">
      <CarsSelector v-bind:key="index" v-bind:cars="allCars"/>
      <CarSpecificationsForm v-bind:car="car"/>
    </div>

    <button @click="compare" class="compare-btn">Jämför</button>

    <h2>{{ output }}</h2>
  </div>
</template>

<script>
import CarSpecificationsForm from './CarSpecificationsForm';
import CarsSelector from './CarsSelector';
import db from '@/firebase/init';

export default {
  name: 'CarsCompare',
  components: {
    CarSpecificationsForm,
    CarsSelector,
  },
  data() {
    return {
      allCars: [],
      currentCars: [],
      formDataOne: '',
      formDataTwo: '',
      output: '',
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
    childClicked1(data) {
      this.formDataOne = data;
    },
    childClicked2(data) {
      this.formDataTwo = data;
    },

    compare() {
      if (this.formDataOne > this.formDataTwo) {
        const result = this.formDataOne - this.formDataTwo;
        this.output = `Bil 1 är' ${result} kr dyrare än bil 2`;
      } else {
        const result = this.formDataTwo - this.formDataOne;
        this.output = `Bil 2 är ${result} kr dyrare än bil 1 första året`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cost-compare-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.cars-selector {
}
.cars-compare-wrapper {
}
.compare-btn {
  padding: 15px 60px;
  background: rgb(245, 120, 75);
}
</style>
