<template>
  <div class="cars-selector">
    <h1>Välj bil</h1>
    <select v-model="car" @change="handleChange">
      <option disabled value>Välj en bil</option>
      <option v-for="(car, index) in allCars" :key="index" :value="car">
        {{ car.name }} — {{ car.specs }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['allCars', 'selectedCar'],
  data() {
    return {
      car: this.selectedCar,
      carIndex: this.$vnode.key.charAt(0),
    };
  },

  updated() {
    //Make this a watcher later
    localStorage.setItem(`car${this.carIndex}`, JSON.stringify(this.car));
  },
  methods: {
    handleChange() {
      this.$emit('selected', { car: this.car, index: this.carIndex });
    },
  },
};
</script>

<style lang="scss" scoped>
.cars-selector {
  padding: 1rem;
  margin: auto;
}
</style>
