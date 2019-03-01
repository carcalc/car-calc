<template>
  <div class="car-details-wrapper">
    <span :class="co2Index"></span>
    <form @submit.prevent class="car-details">
      <fieldset>
        <legend class="input-title">Inköpspris</legend>
        <input lang="sv" type="number" min="0" v-model.number="car.price" />
        <span class="input-subtext">kr</span>
      </fieldset>
      <fieldset>
        <legend class="input-title">Drivmedel</legend>
        <label for="electric">
          El
          <input lang="sv" type="radio" name="electric" v-model="car.type" value="electric" />
        </label>
        <!-- Maybe for future use
        <label for="hybrid">
          Laddhybrid
          <input lang="sv" type="radio" name="hybrid" v-model="car.type" value="hybrid" />
        </label> -->
        <label for="gasoline">
          Bensin/diesel
          <input lang="sv" type="radio" name="gasoline" v-model="car.type" value="gasoline" />
        </label>
      </fieldset>
      <fieldset>
        <legend>Förbrukning</legend>
        <input lang="sv" type="number" step="any" min="0" v-model.number="car.consumption" />
        <span class="input-subtext">{{ fuelUnit }}</span>
      </fieldset>
    </form>
    <div class="stats">
      <h3 class="stat-title">Driftkostnad</h3>
      <span class="stat-number">{{ fuelFormatted }}</span>
      <span class="stat-subtext"> kr per mil</span>
      <h3 class="stat-title">Totalkostnad</h3>
      <span class="stat-number">{{ totalFormatted }}</span>
      <span class="stat-subtext"> kr på {{ usage.ownership }} år</span>
    </div>
  </div>
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
      return this.car.type === 'electric' ? 'kWh/100 km' : 'liter/100 km';
    },
    fuelFormatted: function() {
      return (this.fuelCost * 10).toFixed(1).replace('.', ',');
    },
    totalFormatted: function() {
      return Math.round(this.totalOwnershipCost).toLocaleString();
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
.car-details-wrapper {
  position: relative;
  padding: var(--card-gap);
}
.green,
.yellow,
.orange,
.red {
  position: absolute;
  bottom: 10px;
  right: 10px;
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
