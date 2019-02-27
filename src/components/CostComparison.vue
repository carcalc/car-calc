<template>
  <div class="cost-comparison">
    <template v-for="(car, index) in cars">
      <p :key="index">
        Totalkostnad för
        <span>{{ car.name }}</span>
        är
        <span>{{ totalCost(car).toLocaleString() }} kr</span> och driftkostnaden är
        <span>{{ fuelCost10km(car).toFixed(1) }} kr per mil</span>
      </p>
    </template>

    <p>
      <span>{{ cheapest }}</span> är billigare och utgör
      <span>en besparing på {{ priceDiff }} kr</span>
      över en period om
      <span>{{ usageDetails.ownership }} år</span> och <span>{{ totalDistance }} mil</span>.
    </p>
  </div>
</template>
<script>
export default {
  props: ['usageDetails', 'cars', 'evBonus'],
  methods: {
    isEv(car) {
      return car.type === 'electric' ? this.evBonus : 0;
    },
    fuelCost10km(car) {
      let { kwhPrice, gasPrice } = this.usageDetails;
      let { type, consumption } = car;
      return type === 'electric' ? (consumption * kwhPrice) / 100 : (consumption * gasPrice) / 100;
    },
    cheapestCar(carOne, carTwo) {
      return this.totalCost(carOne) < this.totalCost(carTwo) ? carOne.name : carTwo.name;
    },
    totalCost(car) {
      let { distance, ownership } = this.usageDetails;
      return Math.round(this.fuelCost10km(car) * distance * ownership + car.price - this.isEv(car));
    },
    compareTotal(carOne, carTwo) {
      return carOne < carTwo ? carTwo - carOne : carOne - carTwo;
    },
  },
  computed: {
    totalDistance() {
      return (this.usageDetails.distance * this.usageDetails.ownership) / 10;
    },
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
