<template>
  <form class="car-details">
    <CarIntro :car="car" />

    <InputBlockNumber
      title="Inköpspris"
      name="car-price"
      unit="kr"
      :min="0"
      :max="9999999"
      :maxLength="7"
      :step="1"
      noDecimals
      v-model.number="car.price"
      placeholder="Ange pris"
    />

    <div class="input-block bonus">
      <input
        type="checkbox"
        name="bonus"
        v-model="isNewCar"
        @change="$emit('input', $event.target.checked)"
        :hidden="car.type !== 'electric'"
      />
      <label for="bonus" class="input-title">
        {{
          car.type === 'electric' ? 'Inkludera miljöbilspremie' : 'Miljöbilspremie ej tillämplig'
        }}
      </label>
    </div>

    <FuelSelector title="Drivmedel" v-model="car.type" :carType="car.type" />

    <InputBlockNumber
      title="Förbrukning"
      name="consumption"
      :unit="fuelUnit"
      :step="0.1"
      :min="0"
      :maxLength="4"
      v-model.number="car.consumption"
    />

    <StatisticsBlock
      title="Driftkostnad"
      :value="fuelCost * 10"
      unit="kr/mil"
      name="operating-cost"
      :decimals="2"
    />

    <StatisticsBlock title="Totalkostnad" :value="totalOwnershipCost" unit="kr" name="total-cost" />
  </form>
</template>

<script>
import CarIntro from '@/components/CarIntro';
import InputBlockNumber from '@/components/InputBlockNumber';
import StatisticsBlock from '@/components/StatisticsBlock';
import FuelSelector from '@/components/FuelSelector';

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
    };
  },
  updated() {
    localStorage.setItem(this.$vnode.key, JSON.stringify(this.car));
  },
  computed: {
    fuelCost: function() {
      // per km
      const { gasPrice, kwhPrice } = this.usage;
      const car = this.car;
      return car.type === 'electric'
        ? (car.consumption * kwhPrice) / 100
        : (car.consumption * gasPrice) / 100;
    },
    totalFuelCost: function() {
      const { distance, ownership } = this.usage;
      return Math.round(this.fuelCost * distance * ownership);
    },
    totalOwnershipCost: function() {
      const car = this.car;
      const cost = this.totalFuelCost + car.price;
      return car.type === 'electric' && this.isNewCar ? cost - this.governmentGrant : cost;
    },
    fuelUnit: function() {
      return this.car.type === 'electric' ? 'kWh/100 km' : 'l/100 km';
    },
  },
};
</script>

<style lang="scss" scoped>
.car-details {
  @include card-style();
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
    grid-area: bonus;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid transparent;
    background-color: $input-bg;
    border-radius: $border-radius / 1.5;
    padding: 0 0.5rem;

    .input-title {
      flex: 1;
      font-weight: bold;
      font-size: 0.8rem;
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
