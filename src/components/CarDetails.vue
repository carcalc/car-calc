<template>
  <form class="car-details">
    <CarIntro :car="car" />

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
    />

    <div class="input-block bonus">
      <input
        v-model="isNewCar"
        type="checkbox"
        name="bonus"
        :hidden="!editedCar.isEv"
        @change="$emit('input', $event.target.checked)"
      />
      <label for="bonus" class="input-title">
        {{ editedCar.isEv ? 'Inkludera miljöbilspremie' : 'Miljöbilspremie ej tillämplig' }}
      </label>
    </div>

    <FuelSelector v-model="editedCar.isEv" title="Drivmedel" />

    <InputBlockNumber
      v-model.number="editedCar.consumption"
      title="Förbrukning"
      name="consumption"
      :unit="fuelUnit"
      :step="0.1"
      :min="0"
      :max-length="4"
    />

    <StatisticsBlock
      title="Driftkostnad"
      :value="fuelCostPerKm * 10"
      unit="kr/mil"
      name="operating-cost"
      :decimals="2"
    />

    <StatisticsBlock title="Totalkostnad" :value="totalOwnershipCost" unit="kr" name="total-cost" />
  </form>
</template>

<script>
import CarIntro from '@/components/CarIntro.vue';
import InputBlockNumber from '@/components/InputBlockNumber.vue';
import StatisticsBlock from '@/components/StatisticsBlock.vue';
import FuelSelector from '@/components/FuelSelector.vue';

export default {
  name: 'CarDetails',
  components: { CarIntro, InputBlockNumber, StatisticsBlock, FuelSelector },
  props: {
    car: { type: Object, required: true },
    usage: { type: Object, required: true },
    governmentGrant: { type: Number, required: true },
  },
  data() {
    return {
      isNewCar: true,
      editedCar: this.car,
    };
  },
  car: {
    immediate: true,
    handler(newVal) {
      this.editedCar = newVal;
    },
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
      return car.isEv && this.isNewCar ? cost - this.governmentGrant : cost;
    },
    fuelUnit() {
      return this.car.isEv ? 'kWh/100 km' : 'l/100 km';
    },
  },
  updated() {
    localStorage.setItem(this.$vnode.key, JSON.stringify(this.car));
  },
  methods: {
    changeCar() {
      this.$emit('input', editedCar);
    },
  },
};
</script>

<style lang="scss" scoped>
.car-details {
  @include card-style;

  position: relative;
  display: grid;
  align-content: end;
  gap: 0.5rem;
  grid-template:
    'intro intro intro'
    'price price fuel'
    'bonus bonus  consumption'
    'total operating consumption'
    / minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);

  @media screen and (min-width: $size-small-tablet) {
    grid-template:
      'intro intro'
      'price price'
      'bonus bonus'
      'fuel consumption'
      'operating total'
      / minmax(0, 1fr) minmax(0, 1fr);
  }

  @media screen and (min-width: $size-tablet) {
    gap: 1rem;
  }
}

.input-block {
  &.car-price {
    grid-area: price;

    .input-display {
      font-size: 2rem;

      @media screen and (min-width: $size-tablet) {
        font-size: 3.5rem;
      }
    }
  }

  &.fuel-type {
    grid-area: fuel;
  }

  &.bonus {
    // should probably make this a component
    display: flex;
    grid-area: bonus;
    justify-content: center;
    align-items: center;
    border: 3px solid transparent;
    border-radius: $border-radius-md;
    background-color: $input-bg;
    padding: 0 0.5rem;

    .input-title {
      flex: 1;
      font-size: 0.8rem;
      font-weight: bold;

      @media screen and (min-width: $size-small-tablet) {
        font-size: 0.9rem;
      }

      @media screen and (min-width: $size-tablet) {
        font-size: 1rem;
      }
    }
  }

  &.consumption {
    grid-area: consumption;
  }
}

.stat-block {
  &.operating-cost {
    grid-area: operating;
  }

  &.total-cost {
    grid-area: total;
  }
}
</style>
