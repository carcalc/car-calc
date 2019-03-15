<template>
  <form class="car-details">
    <i class="fas fa-leaf climate-dot" :class="co2Index"></i>
    <div class="car-intro">
      <CarLogo :carName="car.name" />
      <h1 class="card-title">
        {{ car.name }}
      </h1>
      <h3 class="card-subtitle">
        {{ !car.id.includes('generic') ? car.specs : 'Anpassa uppgifterna i rutorna' }}
      </h3>
    </div>

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
      <input
        type="checkbox"
        name="bonus"
        v-model="isNewCar"
        @change="$emit('input', $event.target.checked)"
        :hidden="car.type !== 'electric'"
      />
      <label for="bonus" class="stat-title">
        {{
          car.type === 'electric' ? 'Inkludera miljöbilspremie' : 'Miljöbilspremie ej tillämplig'
        }}
      </label>
    </div>

    <div class="stat-block fuel-type">
      <h3 class="stat-title">Drivmedel</h3>
      <input lang="sv" type="radio" name="electric" v-model="car.type" value="electric" />
      <label for="electric">
        <i class="fas fa-bolt fa-lg"></i>
      </label>
      <input lang="sv" type="radio" name="gasoline" v-model="car.type" value="gasoline" />
      <label for="gasoline">
        <i class="fas fa-gas-pump fa-lg"></i>
      </label>
    </div>

    <div class="stat-block consumption">
      <label class="stat-title" for="consumption">Förbrukning</label>
      <input
        class="stat-display"
        lang="sv"
        type="number"
        name="consumption"
        step=".1"
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
import CarLogo from '@/components/CarLogo';

export default {
  name: 'CarDetails',
  components: { CarLogo },
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
  updated() {
    localStorage.setItem(this.$vnode.key, JSON.stringify(this.car));
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
      const { type, co2, consumption } = this.car;
      if (co2 > 90 || type === 'electric') {
        return 'green';
      } else if (co2 > 75 || consumption < 4.5) {
        return 'yellow';
      } else if (co2 > 60 || consumption < 6.5) {
        return 'orange';
      } else if (co2 > 0 || consumption >= 6.5) {
        return 'red';
      } else {
        return 'none';
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
  @include card-style();
  position: relative;
  display: grid;
  grid-auto-rows: max-content;
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

.car-intro {
  grid-area: intro;
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

.stat-block {
  position: relative;

  &.car-price {
    @include input-stat-block();
    grid-area: price;
    .stat-display {
      font-size: 2rem;
      @media screen and (min-width: $size-tablet) {
        font-size: 3.5rem;
      }
    }
  }
  &.fuel-type {
    @include stat-block-base();
    grid-area: fuel;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-style: italic;
    background-color: $input-bg;
    border-radius: $border-radius;
    border: 3px solid transparent;
    padding-top: 20px;
    font-size: 0.8rem;
    @media screen and (min-width: $size-tablet) {
      font-size: 1rem;
    }

    .stat-title {
      position: absolute;
      top: 5px;
      left: 10px;
    }
  }
  &.bonus {
    @include stat-block-base();
    grid-area: bonus;
    background-color: $input-bg;
    border-radius: $border-radius / 1.5;
    border: 3px solid transparent;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    .stat-title {
      font-style: italic;
    }
  }
  &.consumption {
    @include input-stat-block();
    grid-area: consumption;
  }
  &.operating-cost {
    @include stat-block-base();
    grid-area: operating;
    word-wrap: break-word;
  }
  &.total-cost {
    @include stat-block-base();
    grid-area: total;
    word-wrap: break-word;
  }
}

.climate-dot {
  @include climate-dot();
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
