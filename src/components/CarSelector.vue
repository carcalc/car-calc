<template>
  <div class="cars-selector">
    <h1>Välj bil</h1>
    <select v-model="selected" @change="handleChange">
      <option disabled value>Välj en bil</option>
      <option v-for="car in allCars" :key="car.id" :value="car">{{ car.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['allCars'],
  data() {
    return { selected: '' };
  },
  methods: {
    handleChange() {
      this.$emit('selected', {
        car: this.selected,
        index: this.$vnode.key - 1,
      });
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
