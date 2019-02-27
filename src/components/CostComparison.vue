<template>
  <div class="cost-comparison">
    <template v-for="(car, index) in cars">
      <p :key="index">
        Totalkostnad för
        <span>{{ car.name }}</span>
        är
        <span>{{ totalCost(car).toLocaleString() }}</span> kr och milkostnaden är
        <span>{{ pricePerTenKm(car).toFixed(1) }}</span> kr
      </p>
    </template>

    <p>
      Billaste bilen är
      <span>{{ cheapest }}</span>
      och den är
      <span>{{ priceDiff }}</span>
      kr billigare för perioden
      <span>{{ this.usageDetails.ownership }}</span> år.
    </p>
  </div>
</template>
<script>
export default {
  props: ['usageDetails', 'cars'],
  methods: {
    evBonus(car) {
      return car === 'electric' ? 60000 : 0;
    },
    pricePerTenKm(car) {
      let { kwhPrice, gasPrice } = this.usageDetails;
      let { type, consumption } = car;
      return type === 'electric' ? (consumption * kwhPrice) / 10 : (consumption * gasPrice) / 10;
    },
    cheapestCar(carOne, carTwo) {
      return this.totalCost(carOne) < this.totalCost(carTwo) ? carOne.name : carTwo.name;
    },
    totalCost(car) {
      let { distance, ownership } = this.usageDetails;
      let { price, type } = car;
      return Math.round(
        this.pricePerTenKm(car) * distance * ownership + price - this.evBonus(type),
      );
    },
    compareTotal(carOne, carTwo) {
      return carOne < carTwo ? carTwo - carOne : carOne - carTwo;
    },
  },
  computed: {
    priceDiff() {
      return this.compareTotal(
        this.totalCost(this.cars[0]),
        this.totalCost(this.cars[1]),
      ).toLocaleString();
    },
    cheapest() {
      return this.cheapestCar(this.cars[0], this.cars[1]);
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
