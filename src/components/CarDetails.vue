<template>
  <form class="car-details">
    <span :class="co2Index"></span>

    <div class="stat-block car-price">
      <label class="stat-title" for="car-price">Inköpspris</label>
      <input
        lang="sv"
        class="stat-display"
        type="number"
        name="car-price"
        min="0"
        max="9999999"
        v-model.number="car.price"
        placeholder="Ange pris"
      />
      <span class="stat-display-unit">kr</span>
    </div>

    <div class="stat-block bonus">
      <label class="stat-title" for="bonus">
        Inkludera premie
      </label>
      <input
        class=""
        type="checkbox"
        name="bonus"
        v-model="isNewCar"
        @change="$emit('input', $event.target.checked)"
        :disabled="car.type !== 'electric'"
      />
    </div>

    <div class="stat-block fuel-type">
      <h3 class="stat-title">Drivmedel</h3>
      <input lang="sv" type="radio" name="electric" v-model="car.type" value="electric" />
      <label for="electric"><i class="fas fa-bolt fa-lg"></i></label>
      <input lang="sv" type="radio" name="gasoline" v-model="car.type" value="gasoline" />
      <label for="gasoline"><i class="fas fa-gas-pump fa-lg"></i></label>
    </div>

    <div class="stat-block consumption">
      <label class="stat-title" for="consumption">Förbrukning</label>
      <input
        class="stat-display"
        lang="sv"
        type="number"
        name="consumption"
        step="any"
        min="0"
        v-model.number="car.consumption"
        placeholder="Fyll i"
      />
      <span class="stat-display-unit">{{ fuelUnit }}</span>
    </div>

    <div class="stat-block operating-cost">
      <h3 class="stat-title">Milkostnad</h3>
      <span class="stat-display">
        {{ fuelFormatted }}
        <span class="stat-display-unit">kr</span>
      </span>
    </div>

    <div class="stat-block total-cost">
      <h3 class="stat-title">Totalkostnad {{ yearsFormatted }} år</h3>
      <div class="stat-display">
        {{ totalFormatted }}
        <span class="stat-display-unit">kr</span>
      </div>
    </div>
  </form>
</template>

<script>
import { TweenLite } from 'gsap/TweenMax';

export default {
  name: 'CarDetails',
  props: {
    car: { type: Object, required: true },
    usage: { type: Object, required: true },
    evBonus: { type: Number, required: true },
  },
  data() {
    return {
      tweenedNumbers: {
        total: 0,
        fuelCost: 0,
        ownership: 0,
      },
      isNewCar: true,
    };
  },
  mounted() {
    // Sets animation starting points; can't be done before mount
    this.tweenedNumbers = {
      total: this.totalOwnershipCost,
      fuelCost: this.fuelCost,
      ownership: this.usage.ownership,
    };
  },
  computed: {
    fuelCost: function() {
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
      return car.type === 'electric' && this.isNewCar ? cost - this.evBonus : cost;
    },
    fuelUnit: function() {
      return this.car.type === 'electric' ? 'kWh/100 km' : 'l/100 km';
    },
    ownershipYears: function() {
      return this.usage.ownership;
    },
    fuelFormatted: function() {
      return (this.tweenedNumbers.fuelCost * 10).toFixed(1).replace('.', ',');
    },
    totalFormatted: function() {
      return Math.round(this.tweenedNumbers.total).toLocaleString('sv-SE');
    },
    yearsFormatted: function() {
      return this.tweenedNumbers.ownership.toFixed(0);
    },
    co2Index: function() {
      if (this.car.co2 > 90) {
        return 'green';
      } else if (this.car.co2 > 80 && this.car.co2 < 91) {
        return 'yellow';
      } else if (this.car.co2 > 70 && this.car.co2 < 81) {
        return 'orange';
      } else {
        return 'red';
      }
    },
  },
  watch: {
    // Animates numbers on change
    totalOwnershipCost: function(newValue) {
      TweenLite.to(this.$data.tweenedNumbers, 0.5, { total: newValue });
    },
    fuelCost: function(newValue) {
      TweenLite.to(this.$data.tweenedNumbers, 0.5, { fuelCost: newValue });
    },
    ownershipYears: function(newValue) {
      TweenLite.to(this.$data.tweenedNumbers, 0.5, { ownership: newValue });
    },
  },
};
</script>

<style lang="scss" scoped>
.car-details {
  position: relative;
  display: grid;
  grid-template:
    'price price' 90px
    'fuel consumption' 90px
    'operating total' auto
    / minmax(0, 1fr) minmax(0, 1fr);

  grid-gap: 1rem;
  grid-auto-rows: max-content;

  .stat-block {
    position: relative;

    &.car-price {
      @include number-stat-block();
      grid-area: price;
      .stat-display {
        font-size: 3.5rem;
      }
    }
    &.fuel-type {
      @include stat-block-base();
      grid-area: fuel;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-size: 1rem;
      font-style: italic;
      background-color: $input-bg;
      border-radius: $border-radius;
      border: 3px solid transparent;
      min-width: 100px;

      input,
      label {
        margin: 20px 0 0 0;
      }
      .stat-title {
        position: absolute;
        top: 5px;
        left: 10px;
      }
    }
    &.bonus {
      display: none;
      // Hidden until fully developed
    }
    &.consumption {
      @include number-stat-block();
      grid-area: consumption;
    }
    &.operating-cost {
      @include stat-block-base();
      grid-area: operating;

      word-wrap: break-word;
      max-width: 300px;
    }
    &.total-cost {
      @include stat-block-base();
      grid-area: total;

      word-wrap: break-word;
      max-width: 300px;
    }
  }
}
.green,
.yellow,
.orange,
.red {
  position: absolute;
  top: -160px;
  right: -14px;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  z-index: 5;
}
.green {
  background: rgb(42, 192, 92);
}
.yellow {
  background: rgb(255, 241, 40);
}
.orange {
  background: rgb(255, 174, 0);
}
.red {
  background: rgb(248, 54, 20);
}
</style>
