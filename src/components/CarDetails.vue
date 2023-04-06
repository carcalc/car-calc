<template>
  <form class="car-details">
    <CarIntro :car="car" style="grid-area: intro" />

    <InputBlockNumber
      v-model.number="editedCar.price"
      title="Inköpspris"
      name="car-price"
      unit="kr"
      :min="0"
      :max="9999999"
      :max-length="7"
      :step="1"
      no-decimals
      placeholder="Ange pris"
      style="grid-area: price"
    />

    <FuelSelector v-model="editedCar.isEv" title="Drivmedel" style="grid-area: fuel" />

    <InputBlockNumber
      v-model.number="editedCar.consumption"
      title="Förbrukning"
      name="consumption"
      :unit="fuelUnit"
      :step="0.1"
      :min="0"
      :max-length="4"
      style="grid-area: consumption"
    />

    <StatisticsBlock
      title="Driftkostnad"
      :value="fuelCostPerKm * 10"
      unit="kr/mil"
      name="operating-cost"
      :decimals="2"
      style="grid-area: operating"
    />

    <StatisticsBlock
      title="Totalkostnad"
      style="grid-area: total"
      :value="totalOwnershipCost"
      unit="kr"
      name="total-cost"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import CarIntro from '@/components/CarIntro.vue';
import FuelSelector from '@/components/FuelSelector.vue';
import InputBlockNumber from '@/components/InputBlockNumber.vue';
import StatisticsBlock from '@/components/StatisticsBlock.vue';
import type { Car } from '@/types';

export default defineComponent({
  name: 'CarDetails',
  components: { CarIntro, InputBlockNumber, StatisticsBlock, FuelSelector },
  props: {
    car: { type: Object as PropType<Car>, required: true },
    usage: { type: Object, required: true },
  },
  data(): { editedCar: Car } {
    return {
      editedCar: { ...this.car },
    };
  },
  computed: {
    fuelCostPerKm() {
      const { gasPrice, kwhPrice } = this.usage;
      const car = this.car;
      return (car.consumption * (car.isEv ? kwhPrice : gasPrice)) / 100;
    },
    totalFuelCost() {
      const { distance, ownership } = this.usage;
      return Math.round(this.fuelCostPerKm * distance * ownership);
    },
    totalOwnershipCost() {
      const car = this.car;
      const cost = this.totalFuelCost + car.price;
      return cost;
    },
    fuelUnit() {
      return this.car.isEv ? 'kWh/100 km' : 'l/100 km';
    },
  },
  watch: {
    // Todo: rework as v-model
    car: {
      immediate: true,
      handler(newVal) {
        this.editedCar = newVal;
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.car-details {
  display: grid;
  align-content: end;
  gap: $gutter-sm;
  grid-template:
    'intro intro intro'
    'price price fuel'
    '.     .     consumption'
    'total operating consumption'
    / minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);

  @media screen and (min-width: $size-small-tablet) {
    grid-template:
      'intro intro'
      'price price'
      'fuel consumption'
      'operating total'
      / minmax(0, 1fr) minmax(0, 1fr);
  }

  @media screen and (min-width: $size-tablet) {
    gap: $gutter-lg;
  }
}
</style>
