<template>
  <select class="cars-selector" v-model="car" @change="handleChange">
    <option disabled value>Välj en bil</option>
    <option v-for="(car, index) in allCars" :key="index" :value="car">
      {{ car.name }} — {{ car.specs }}
    </option>
  </select>
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
  margin: auto;
}
</style>
