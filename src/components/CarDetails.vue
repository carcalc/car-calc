<template>
  <div class="car-details-wrapper">
    <h1>
      {{ car.name }}
    </h1>
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
      <span>{{ unit }}</span>
    </form>
    <h2>
      Kostnader
    </h2>
    <p>
      Driftkostnad:
      {{ fuel }}
      kr per mil
    </p>
    <p>
      Totalkostnad:
      {{ total }}
      kr på
      {{ usage.ownership }}
      år
    </p>
  </div>
</template>

<script>
export default {
  name: 'CarDetails',
  props: ['car', 'usage', 'evBonus'],
  methods: {
    fuelCost({ type, consumption }, { gasPrice, kwhPrice }) {
      return type === 'electric' ? (consumption * kwhPrice) / 100 : (consumption * gasPrice) / 100;
    },
    totalCost({ type, price }, { ownership, distance }) {
      const cost = this.fuelCost(this.car, this.usage) * distance * ownership + price;
      console.log('cost: ', cost);
      return type === 'electric' ? cost - this.evBonus : cost;
    },
  },
  computed: {
    unit() {
      return this.car.type === 'electric' ? '(kWh/100 km)' : '(liter/100 km)';
    },
    fuel() {
      return (this.fuelCost(this.car, this.usage) * 10).toFixed(1).replace('.', ',');
    },
    total() {
      return Math.round(this.totalCost(this.car, this.usage)).toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped>
.car-details-wrapper {
  padding: 3rem;
  margin: auto;
}
</style>
