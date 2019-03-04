<template>
  <form class="car-details">
    <span :class="co2Index"></span>

    <fieldset class="stat-block car-price">
      <label class="block-title" for="car-price">Inköpspris</label>
      <input
        class="big-number"
        lang="sv"
        type="number"
        name="car-price"
        min="0"
        maxlength="7"
        v-model.number="car.price"
      />
      <span class="big-number-unit">kr</span>
    </fieldset>

    <fieldset class="stat-block fuel-type">
      <h3 class="block-title">Drivmedel</h3>
      <label for="electric">
        El
      </label>
      <input
        class="big-number"
        lang="sv"
        type="radio"
        name="electric"
        v-model="car.type"
        value="electric"
      />
      <label for="gasoline">
        Bensin, diesel
      </label>
      <input
        class="big-number"
        lang="sv"
        type="radio"
        name="gasoline"
        v-model="car.type"
        value="gasoline"
      />
    </fieldset>

    <fieldset class="stat-block consumption">
      <h3 class="block-title">Förbrukning</h3>
      <input
        class="big-number"
        lang="sv"
        type="number"
        step="any"
        min="0"
        v-model.number="car.consumption"
      />
      <span class="big-number-unit">{{ fuelUnit }}</span>
    </fieldset>

    <div class="stat-block operating-cost">
      <h3 class="block-title">Milkostnad</h3>
      <span class="big-number">{{ fuelFormatted }} <span class="big-number-unit"> kr</span> </span>
    </div>

    <div class="stat-block total-cost">
      <h3 class="block-title">Totalkostnad {{ usage.ownership }} år</h3>
      <span class="big-number">{{ totalFormatted }} <span class="big-number-unit"> kr</span></span>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CarDetails',
  props: ['car', 'usage', 'evBonus'],
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
      return car.type === 'electric' ? cost - this.evBonus : cost;
    },
    fuelUnit: function() {
      return this.car.type === 'electric' ? 'kWh/100 km' : 'l/100 km';
    },
    fuelFormatted: function() {
      return (this.fuelCost * 10).toFixed(1).replace('.', ',');
    },
    totalFormatted: function() {
      return Math.round(this.totalOwnershipCost).toLocaleString('sv-SE');
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
};
</script>

<style lang="scss" scoped>
.car-details {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .stat-block {
    @include stat-block;

    &.car-price {
      grid-column: 1 /-1;
      input[name='car-price'] {
        font-size: 4rem;
        @media screen and (min-width: 650px) and (max-width: 1200px) {
          font-size: 3rem;
        }
      }
    }
    &.total-cost {
      .big-number {
        font-size: 2rem;
      }
    }
  }
}
.green,
.yellow,
.orange,
.red {
  position: absolute;
  top: -138px;
  right: -14px;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
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
