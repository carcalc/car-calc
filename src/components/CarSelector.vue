<template>
  <div class="car-selector">
    <button :disabled="isDisabled" @click="handleSelect(0)">
      <i class="fas fa-chevron-circle-up"></i>
    </button>
    <select v-model="selectedCar">
      <option disabled selected hidden value="null">Välj en bil</option>
      <option v-for="(car, index) in cars" :key="index" :value="car">
        {{ car.name }} — {{ car.specs }}
      </option>
    </select>
    <button :disabled="isDisabled" @click="handleSelect(1)">
      <i class="fas fa-chevron-circle-down"></i>
    </button>
  </div>
</template>

<script lang="ts">
import type { Car } from '@/types';
import { getCars } from '@/firebase';
import { defaultCars } from '@/data';

export default {
  emits: ['select-car'],
  data(): { cars: Car[]; selectedCar: Car | null } {
    return {
      selectedCar: null,
      cars: [],
    };
  },
  computed: {
    isDisabled() {
      return !this.selectedCar;
    },
  },
  async created() {
    const cars = await getCars();
    this.cars = [...defaultCars, ...cars];
  },
  methods: {
    handleSelect(index: number) {
      this.$emit('select-car', { car: this.selectedCar, index });
      this.selectedCar = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.car-selector {
  @include card-style;

  grid-area: selector;
  gap: 0 !important;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
}

select {
  font-weight: bold;
  font-style: italic;
  background-color: $input-bg;
  appearance: none;
  background-repeat: no-repeat;
  border: 3px solid transparent;
  background-image: url('../assets/select-arrow.svg');
  padding: 2px 25px 2px 5px;
  height: 25px;
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
  margin: 0;
  border: 3px solid transparent;
  padding: 0 5px;
  appearance: none;
  height: 25px;
  font-size: 1rem;

  @media screen and (min-width: $size-tablet) {
    height: 40px;
    font-size: 1.5rem;
  }

  &:first-of-type {
    border-radius: $border-radius-md 0 0 $border-radius-md;

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
    border-radius: 0 $border-radius-md $border-radius-md 0;

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
