<template>
  <div class="cars-selector">
    <h1>Välj bil</h1>
    <select v-model="selected" @change="handleChange">
      <option disabled value>Välj en bil</option>
      <option v-for="car in allCars" :key="car.id" :value="car">
        {{ car.name }} — {{ car.specs }}
      </option>
    </select>
  </div>
</template>

<script>
import defaultData from '@/defaultData.json';
export default {
  props: ['allCars'],
  data() {
    return { selected: defaultData.cars, selectorId: this.$vnode.key };
  },
  created() {
    this.getStoredCar();
  },
  updated() {
    this.saveCar();
  },
  methods: {
    handleChange() {
      const index = this.selectorId.charAt(0);
      this.$emit('selected', { car: this.selected, index });
    },
    saveCar() {
      localStorage.setItem(this.selectorId, JSON.stringify(this.selected));
      this.handleChange();
    },
    getStoredCar() {
      const car = JSON.parse(localStorage.getItem(this.selectorId));
      car !== null ? (this.selected = car) : '';
      this.handleChange();
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
