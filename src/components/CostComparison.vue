<template>
  <div class="cost-comparison">
    <!-- This is just bullshit output to make sure data is where it's supposed to be -->
    <!-- remove all this crap once we have proper computed properties to display -->
    <!-- <p>{{ usageDetails.distance }} körsträcka</p>
    <p>{{ usageDetails.gasPrice }} bensin/dieselpris</p>
    <p>{{ usageDetails.kwhPrice }} elpris</p>

    <p>Pris {{ selectedCars[0].name }}: {{ selectedCars[0].price }} kr</p>
    <p>Pris {{ selectedCars[1].name }}: {{ selectedCars[1].price }} kr</p>-->
    <h1>
      <span>Totalkostnad för</span>
      {{ selectedCars[0].name }}
      <span>är</span>
      {{ allYearsTotalCarOne }} kr
    </h1>
    <h1>
      <span>Totalkostnad för</span>
      {{ selectedCars[1].name }}
      <span>är</span>
      {{ allYearsTotalCarTwo }} kr
    </h1>
    <h1>
      {{ cheapest }}
      <span>är</span>
      {{ comparisonFirstYearResult }}
      <span>kr billigare första året.</span>
    </h1>
    <h1>
      {{ cheapest }}
      <span>är</span>
      {{ comparisonAllYearsResult }}
      <span>kr billigare beräknat på {{ usageDetails.ownership }} år.</span>
    </h1>
  </div>
</template>

<script>
export default {
  props: ['usageDetails', 'selectedCars'],
  methods: {
    electricPremie(car) {
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
    firstYearTotal(car) {
      let { price, type } = car;
      let { distance } = this.usageDetails;
      return Math.round(this.pricePerTenKm(car) * distance + price - this.electricPremie(type));
    },
    allYearsTotal(car) {
      let { distance, ownership } = this.usageDetails;
      let { price, type } = car;
      return Math.round(
        this.pricePerTenKm(car) * distance * ownership + price - this.electricPremie(type)
      );
    },
    comparisonFirstYear(carOne, carTwo) {
      let result = 0;
      carOne < carTwo ? (result = carTwo - carOne) : (result = carOne - carTwo);
      return result;
    },
    comparisonAllYears(carOne, carTwo) {
      let result = 0;
      carOne < carTwo ? (result = carTwo - carOne) : (result = carOne - carTwo);
      return result;
    },
    cheapestCar(carOne, carTwo) {
      let cheapest = '';
      carOne < carTwo ? (cheapest = carOne.name) : (cheapest = carTwo.name);
      return cheapest;
    },
  },
  computed: {
    taxCredit() {
      // if possible, calculate tax credit for green cars; otherwise make sure the database has this info
      return '';
    },
    firstYearTotalCarOne() {
      return this.firstYearTotal(this.selectedCars[0]).toLocaleString();
    },
    firstYearTotalCarTwo() {
      return this.firstYearTotal(this.selectedCars[1]).toLocaleString();
    },
    allYearsTotalCarOne() {
      return this.allYearsTotal(this.selectedCars[0]).toLocaleString();
    },
    allYearsTotalCarTwo() {
      return this.allYearsTotal(this.selectedCars[1]).toLocaleString();
    },
    comparisonFirstYearResult() {
      const carOne = this.firstYearTotal(this.selectedCars[0]);
      const carTwo = this.firstYearTotal(this.selectedCars[1]);
      return this.comparisonFirstYear(carOne, carTwo).toLocaleString();
    },
    comparisonAllYearsResult() {
      const carOne = this.allYearsTotal(this.selectedCars[0]);
      const carTwo = this.allYearsTotal(this.selectedCars[1]);
      return this.comparisonAllYears(carOne, carTwo).toLocaleString();
    },
    cheapest() {
      return this.cheapestCar(this.selectedCars[0], this.selectedCars[1]);
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
