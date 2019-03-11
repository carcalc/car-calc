<template>
  <div class="car-selector">
    <h1 class="card-title">
      {{ car.name }}
    </h1>
    <h3 class="card-subtitle">
      {{ !car.id.includes('generic') ? car.specs : 'Anpassa själv efter önskemål' }}
    </h3>
    <select class="cars-dropdown" v-model="car" @change="handleChange">
      <option disabled value>Välj bil (valfritt)</option>
      <option v-for="(car, index) in allCars" :key="index" :value="car">
        {{ car.name }} — {{ car.specs }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    selectedCar: { type: Object, required: true },
    allCars: { type: Array, required: true },
  },
  data() {
    return {
      car: this.selectedCar,
      carIndex: this.$vnode.key.charAt(0),
    };
  },
  updated() {
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
.car-selector {
  text-align: center;
  display: grid;
  grid-template-areas: 'title' 'subtitle' 'selector';
  grid-gap: 1rem;
}
.cars-dropdown {
  @include number-stat-block();
  padding: 5px 40px 5px 10px;
  font-weight: bold;
  font-style: italic;
  font-size: 1rem;
  border: none;
  height: 40px;
  width: 100%;
  background-color: $input-bg;
  border-radius: $border-radius / 1.5;
  appearance: none;
  background-image: url('../assets/select-arrow.svg');
  background-size: 28px;
  background-repeat: no-repeat;
  background-position: right 6px bottom 10px;
  border: 3px solid transparent;

  &:focus,
  &:hover {
    border: $input-focus-border;
  }
}
</style>
