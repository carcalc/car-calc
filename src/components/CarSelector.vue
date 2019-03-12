<template>
  <div class="car-selector">
    <div class="text-wrapper">
      <h1 class="card-title">
        {{ car.name }}
      </h1>
      <h3 class="card-subtitle">
        {{ !car.id.includes('generic') ? car.specs : 'Anpassa själv efter önskemål' }}
      </h3>
    </div>
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
  display: grid;
  grid-gap: 0.5rem;
  grid-template:
    'title'
    'selector';
  @media screen and (min-width: $size-tablet) {
    grid-gap: 1rem;
  }
}

.text-wrapper {
  grid-area: title;
  .card-title {
    display: inline;
    font-weight: bold;
    font-size: 1rem;
    @media screen and (min-width: $size-tablet) {
      display: block;
      text-align: center;
      font-size: 2rem;
    }
  }
  .card-subtitle {
    display: inline;
    font-size: 0.8rem;
    text-align: right;
    @media screen and (min-width: $size-tablet) {
      display: block;
      text-align: center;
      font-size: 1.2rem;
    }
  }
}

.cars-dropdown {
  grid-area: selector;
  font-weight: bold;
  font-style: italic;
  border: none;
  width: 100%;
  background-color: $input-bg;
  border-radius: $border-radius / 1.5;
  appearance: none;
  background-image: url('../assets/select-arrow.svg');
  background-repeat: no-repeat;
  border: 3px solid transparent;
  height: 25px;
  padding: 0px 25px 0px 0px;
  background-size: 18px;
  background-position: right 4px bottom 5px;
  @media screen and (min-width: $size-tablet) {
    height: 40px;
    background-size: 28px;
    background-position: right 6px bottom 10px;
    padding: 5px 40px 5px 10px;
    font-size: 1rem;
  }

  &:focus,
  &:hover {
    border: $input-focus-border;
  }
}
</style>
