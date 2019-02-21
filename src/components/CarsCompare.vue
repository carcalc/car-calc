<template>
  <div class="carsCompareWrapper">
    <br>
    <br>
    <div class="CarsSelector">
      <CarsSelector key="1" v-bind:cars="cars"/>
      <CarsSelector key="2" v-bind:cars="cars"/>
    </div>
    <div class="formWrapper">
      <CarSpecificationsForm key="1" title="Bil 1" v-on:dataToParent="childClicked1"/>
      <CarSpecificationsForm key="2" title="Bil 2" v-on:dataToParent="childClicked2"/>
    </div>
    <br>
    <button @click="compare" class="compareBtn">Jämför</button>
    <br>
    <br>
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
      cars: [],
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
          this.cars.push(car);
        });
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
.carsCompareWrapper {
  width: 100%;
}
.CarsSelector {
  display: flex;
  width: 100%;
}
.formWrapper {
  display: flex;
  width: 100%;
  margin: auto;
}
.compareBtn {
  padding: 15px 60px;
  background: rgb(245, 120, 75);
}
</style>
