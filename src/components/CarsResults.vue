<template>
  <div class="cost-comparison">
    <template v-for="(car, index) in cars">
      <p :key="index">
        Totalkostnad för
        <span>{{ car.name }}</span>
        är
        <span>{{ Math.round(totalCost(index)).toLocaleString() }} kr</span> och driftkostnaden är
        <span>{{ (fuelCostPerKm(index) * 10).toFixed(1).replace('.', ',') }} kr per mil</span>
      </p>
    </template>

    <p>
      <span>{{ cheapest }}</span> är billigare totalt sett och utgör en
      <span>besparing på {{ savings }} kr</span> på <span> {{ usage.ownership }} år</span> och
      <span>{{ distance }} km</span>.
      <!-- Data we can add: -->
      <!-- Display total fuel costs and bonus separately -->
      <!-- Car X is % cheaper to run-->
    </p>
  </div>
</template>
<script>
export default {
  props: ['usage', 'cars', 'evBonus'],
  data() {
    return {
      testData: '',
      carStats: [{ total: null, fuel: null }, { total: null, fuel: null }],
    };
  },
  methods: {
    // Should probably make this total fuel costs
    fuelCostPerKm(index) {
      const { gasPrice, kwhPrice } = this.usage;
      const { type, consumption } = this.cars[index];
      const cost =
        type === 'electric' ? (consumption * kwhPrice) / 100 : (consumption * gasPrice) / 100;
      this.carStats[index].fuel = cost;
      return cost;
    },
    totalCost(index) {
      const { type, price } = this.cars[index];
      const { fuel } = this.carStats[index];
      const { distance, ownership } = this.usage;
      const cost = fuel * distance * ownership + price;
      this.carStats[index].total = cost;
      return type === 'electric' ? cost - this.evBonus : cost;
    },
  },
  computed: {
    distance: function() {
      return (this.usage.distance * this.usage.ownership) / 10;
    },
    savings: function() {
      return Math.round(
        this.carStats[0].total < this.carStats[1].total
          ? this.carStats[1].total - this.carStats[0].total
          : this.carStats[0].total - this.carStats[1].total,
      ).toLocaleString();
    },
    cheapest: function() {
      return this.carStats[0].total > this.carStats[1].total
        ? this.cars[0].name
        : this.cars[1].name;
    },
  },
};
</script>
<style lang="scss" scoped>
.cost-comparison {
  grid-column: 1 / -1;
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 80, 0.15);
  transition: all 300ms;
  max-width: 80%;
  margin: 2rem auto;
  padding: 2rem;
  h1 {
    color: orangered;
  }
}
span {
  font-size: 1.5rem;
  color: #333;
}
</style>
