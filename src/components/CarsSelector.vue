<template>
  <form class="cars-selector">
    <h1>Välj bil</h1>
    <select v-model="selectedCar" @change="selectCar">
      <option v-for="car in cars" :key="car.id" :value="car" :selectCar="selectedCar === car">{{
        car.name
      }}</option>
    </select>
  </form>
</template>

<script>
export default {
  name: 'CarsSelector',
  data() {
    return {
      selectedCar: {},
    };
  },
  props: ['cars'],

  methods: {
    selectCar() {
      this.$root.$emit('selected', this.selectedCar);
    },
    pickRandomCarOnLoad() {
      return this.cars[Math.floor(Math.random() * this.cars.length)];
    },
  },
  created() {
    this.selectedCar = this.pickRandomCarOnLoad();
  },
};
</script>

<style lang="scss" scoped>
.cars-selector {
  width: 40%;
  border: 1px solid #333;
  padding: 20px;
  margin: auto;
}
</style>
