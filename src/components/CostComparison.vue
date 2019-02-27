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
      let result = 0;
      let { kwhPrice, gasPrice } = this.usageDetails;
      let { type, consumption } = car;
      type === 'electric'
        ? (result = (consumption * kwhPrice) / 10)
        : (result = (consumption * gasPrice) / 10);
      return result;
    },
    cheapestCar(carOne, carTwo) {
      let cheapest = '';
      let cheapestCarOne = this.totalCost(carOne);
      let cheapestCarTwo = this.totalCost(carTwo);
      cheapestCarOne < cheapestCarTwo ? (cheapest = carOne.name) : (cheapest = carTwo.name);
      return cheapest;
    },
    totalCost(car) {
      let { distance, ownership } = this.usageDetails;
      let { price, type } = car;
      return Math.round(
        this.pricePerTenKm(car) * distance * ownership + price - this.evBonus(type),
      );
    },
    compareTotal(carOne, carTwo) {
      let result = 0;

      const carOneResult = this.totalCost(carOne);
      const carTwoResult = this.totalCost(carTwo);

      carOneResult < carTwoResult
        ? (result = carTwoResult - carOneResult)
        : (result = carOneResult - carTwoResult);
      return result;
    },
  },
  computed: {
    priceDiff() {
      return this.compareTotal(this.cars[0], this.cars[1]).toLocaleString();
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
