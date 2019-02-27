<template>
  <div class="cost-comparison">
    <p>
      Totalkostnad för
      <span>{{ firstCar.name }}</span>
      är
      <span>{{ allYearsTotalCarOne }}</span> kr och kostnad per mil är
      <span>{{ pricePerTenKmCarOne }}</span> kr
    </p>
    <p>
      Totalkostnad för
      <span>{{ secondCar.name }}</span>
      är
      <span>{{ allYearsTotalCarTwo }}</span> kr och kostnad per mil är
      <span>{{ pricePerTenKmCarTwo }}</span> kr
    </p>
    <p>
      Billaste bilen är
      <span>{{ cheapest }}</span>
      och den är
      <span>{{ comparisonAllYearsResult }}</span>
      kr billigare för perioden
      <span>{{ this.usageDetails.ownership }}</span> år.
    </p>
  </div>
</template>
<script>
export default {
  props: ['usageDetails', 'firstCar', 'secondCar'],
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
      let cheapestCarOne = this.allYearsTotal(carOne);
      let cheapestCarTwo = this.allYearsTotal(carTwo);
      cheapestCarOne < cheapestCarTwo ? (cheapest = carOne.name) : (cheapest = carTwo.name);
      return cheapest;
    },
    allYearsTotal(car) {
      let { distance, ownership } = this.usageDetails;
      let { price, type } = car;
      return Math.round(
        this.pricePerTenKm(car) * distance * ownership + price - this.evBonus(type)
      );
    },
    comparisonAllYears(carOne, carTwo) {
      let result = 0;

      const carOneResult = this.allYearsTotal(carOne);
      const carTwoResult = this.allYearsTotal(carTwo);

      carOneResult < carTwoResult
        ? (result = carTwoResult - carOneResult)
        : (result = carOneResult - carTwoResult);
      return result;
    }
  },
  computed: {
    pricePerTenKmCarOne() {
      return this.pricePerTenKm(this.firstCar).toFixed(1);
    },
    pricePerTenKmCarTwo() {
      return this.pricePerTenKm(this.secondCar).toFixed(1);
    },
    allYearsTotalCarOne() {
      return this.allYearsTotal(this.firstCar).toLocaleString();
    },
    allYearsTotalCarTwo() {
      return this.allYearsTotal(this.secondCar).toLocaleString();
    },
    comparisonAllYearsResult() {
      return this.comparisonAllYears(this.firstCar, this.secondCar).toLocaleString();
    },
    cheapest() {
      return this.cheapestCar(this.firstCar, this.secondCar);
    }
  }
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
