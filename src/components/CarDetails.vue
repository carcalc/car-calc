<template>
  <div class="car-details-wrapper">
    <h1>
      {{ car.name }}
    </h1>
    <div v-bind:class="co2Index"></div>
    <h4 v-if="!this.car.id.includes('generic')">
      {{ car.specs }}
    </h4>

    <form @submit.prevent class="car-details">
      <h2>
        Inköpspris
      </h2>
      <input type="number" min="0" v-model.number="car.price" />
      <span>(kr)</span>
      <h2>
        Drivmedel
      </h2>
      <input type="radio" name="electric" v-model="car.type" value="electric" />
      <label for="electric">El</label>
      <input type="radio" name="hybrid" v-model="car.type" value="hybrid" />
      <label for="hybrid">Laddhybrid</label>
      <input type="radio" name="gasoline" v-model="car.type" value="gasoline" />
      <label for="gasoline">Bensin/diesel</label>

      <h2>
        Förbrukning
      </h2>
      <input type="number" step="any" min="0" v-model.number="car.consumption" />
      <span>{{ fuelUnit }}</span>
    </form>
    <h2>
      Kostnader
    </h2>
    <p>
      Driftkostnad:
      {{ fuelCost10km.toFixed(1) }}
      kr per mil
    </p>
    <p>
      Totalkostnad:
      {{ totalCost }}
      kr på
      {{ usageDetails.ownership }}
      år
    </p>
  </div>
</template>

<script>
export default {
  name: 'CarDetails',
  props: ['car', 'usageDetails', 'evBonus'],
  methods: {
    isEv(car) {
      return car.type === 'electric' ? this.evBonus : 0;
    },
  },
  computed: {
    fuelUnit() {
      return this.car.type === 'electric' ? '(kWh/100 km)' : '(liter/100 km)';
    },
    fuelCost10km() {
      let { kwhPrice, gasPrice } = this.usageDetails;
      let { type, consumption } = this.car;
      return type === 'electric' ? (consumption * kwhPrice) / 100 : (consumption * gasPrice) / 100;
    },
    totalCost() {
      return Math.round(
        this.car.price -
          this.isEv(this.car) +
          this.fuelCost10km * this.usageDetails.distance * this.usageDetails.ownership,
      ).toLocaleString();
    },
    co2Index() {
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
  padding: 3rem;
  margin: auto;
}
.green,
.yellow,
.orange,
.red {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.green {
  background: green;
}
.yellow {
  background: yellow;
}
.orange {
  background: orange;
}
.red {
  background: red;
}
</style>
