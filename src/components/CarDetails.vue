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

    <div class="input-block car-price">
      <label class="input-title" for="car-price">Inköpspris</label>
      <input
        lang="sv"
        class="input-display"
        type="number"
        name="car-price"
        min="0"
        max="9999999"
        v-model.number="car.price"
        placeholder="Ange pris"
        inputmode="numeric"
        pattern="[0-9]*"
      />
      <span class="input-display-unit">kr</span>
    </div>

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

    <div class="input-block fuel-type">
      <h3 class="input-title">Drivmedel</h3>
      <div class="input-display">
        <input lang="sv" type="radio" name="electric" v-model="car.type" value="electric" />
        <label for="electric">
          <i class="fas fa-bolt fa-lg"></i>
        </label>
        <input lang="sv" type="radio" name="gasoline" v-model="car.type" value="gasoline" />
        <label for="gasoline">
          <i class="fas fa-gas-pump fa-lg"></i>
        </label>
      </div>
    </div>

    <div class="input-block consumption">
      <label class="input-title" for="consumption">Förbrukning</label>
      <input
        class="input-display"
        lang="sv"
        type="number"
        name="consumption"
        step=".1"
        min="0"
        v-model.number="car.consumption"
        placeholder="Fyll i"
        inputmode="numeric"
        pattern="[0-9]*"
      />
      <span class="input-display-unit">{{ fuelUnit }}</span>
    </div>

    <div class="stat-block operating-cost">
      <h3 class="stat-title">Driftkostnad</h3>
      <span class="stat-display">
        <BaseAnimatedNumber :value="fuelCost" />
        <span class="stat-display-unit"> kr/mil</span>
      </span>
    </div>

    <div class="stat-block total-cost">
      <h3 class="stat-title">
        Totalkostnad
        <BaseAnimatedNumber :value="usage.ownership" />
        år
      </h3>
      <div class="stat-display">
        <BaseAnimatedNumber :value="totalOwnershipCost" />
        <span class="stat-display-unit"> kr</span>
      </div>
    </div>
  </form>
</template>

<script>
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
      return car.type === 'electric' && this.isNewCar ? cost - this.evBonus : cost;
    },
    fuelUnit: function() {
      return this.car.type === 'electric' ? 'kWh/100 km' : 'l/100 km';
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

.input-block {
  position: relative;
  &.car-price {
    @include full-input-block();
    grid-area: price;
    .input-display {
      font-size: 2rem;
      @media screen and (min-width: $size-tablet) {
        font-size: 3.5rem;
      }
    }
  }
  &.fuel-type {
    @include full-input-block();
    grid-area: fuel;
    .input-display {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding-top: 20px;
      font-size: 0.8rem;
      @media screen and (min-width: $size-tablet) {
        font-size: 1rem;
      }
    }
  }
  &.bonus {
    grid-area: bonus;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid transparent;
    background-color: $input-bg;
    border-radius: $border-radius / 1.5;
    .input-title {
      @include stat-title();
    }
  }
  &.consumption {
    @include full-input-block();
    grid-area: consumption;
  }
}

.stat-block {
  &.operating-cost {
    @include full-stat-block();
    grid-area: operating;
    word-wrap: break-word;
  }
  &.total-cost {
    @include full-stat-block();
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
