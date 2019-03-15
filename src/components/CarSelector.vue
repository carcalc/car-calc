<template>
  <div class="car-selector">
    <button :disabled="selectedCar === null" @click="dispatchCar(0)">
      <i class="fas fa-chevron-circle-up"></i>
    </button>
    <select v-model="selectedCar">
      <option disabled selected hidden value="null">Välj en bil</option>
      <option v-for="(car, index) in allCars" :key="index" :value="car">
        {{ car.name }} — {{ car.specs }}
      </option>
    </select>
    <button :disabled="selectedCar === null" @click="dispatchCar(1)">
      <i class="fas fa-chevron-circle-down"></i>
    </button>
  </div>
</template>

<script>
import db from '@/firebase/init';
import defaultData from '@/defaultData.json';

export default {
  data() {
    return {
      selectedCar: null,
      allCars: [],
    };
  },
  created() {
    this.fetchCars();
  },
  methods: {
    dispatchCar(side) {
      this.$emit('click', { car: this.selectedCar, index: side });
      this.selectedCar = null;
    },
    sortCars(cars) {
      return cars.sort((a, b) => a.name.localeCompare(b.name));
    },
    fetchCars() {
      let cars = [];
      db.collection('cars')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let car = doc.data();
            car.id = doc.id;
            cars.push(car);
          });
          this.allCars.push(...this.sortCars(cars));
          this.allCars.unshift(...defaultData.cars);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.car-selector {
  @include card-style();
  grid-area: selector;
  gap: 0 !important;
  display: flex;
  align-items: center;
}

select {
  width: 100%;
  font-weight: bold;
  font-style: italic;
  border: none;
  flex: 1 1 70%;
  background-color: $input-bg;
  // border-radius: $border-radius / 1.5;
  appearance: none;
  background-image: url('../assets/select-arrow.svg');
  background-repeat: no-repeat;
  border: 3px solid transparent;
  height: 25px;
  padding: 2px 25px 2px 5px;
  background-size: 18px;
  background-position: right 4px bottom 5px;

  @media screen and (min-width: $size-tablet) {
    font-size: 1rem;
    height: 40px;
    background-size: 28px;
    background-position: right 6px bottom 10px;
    padding: 5px 40px 5px 10px;
  }

  &:focus,
  &:hover {
    border: $input-focus-border;
  }
}
button {
  width: 100%;
  flex: 1;
  background-color: $input-bg;
  color: $black;
  border: 3px solid transparent;
  padding: 0 5px;
  margin: 0;
  appearance: none;
  height: 25px;
  font-size: 1rem;

  @media screen and (min-width: $size-tablet) {
    height: 40px;
    font-size: 1.5rem;
  }

  &:first-of-type {
    border-radius: $border-radius / 1.5 0 0 $border-radius / 1.5;
    i {
      @media screen and (min-width: $size-small-tablet) {
        transform: rotate(180deg);
      }
      @media screen and (min-width: $size-desktop) {
        transform: rotate(-90deg);
      }
    }
  }
  &:last-of-type {
    border-radius: 0 $border-radius / 1.5 $border-radius / 1.5 0;
    i {
      @media screen and (min-width: $size-desktop) {
        transform: rotate(-90deg);
      }
    }
  }
  &:disabled {
    opacity: 0.5;
  }
  &:not(:disabled):focus,
  &:not(:disabled):hover {
    border: $input-focus-border;
  }
}
</style>
