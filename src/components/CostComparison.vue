<template>
  <div class="cost-comparison">-här hamnar besparingar och grafer-
    <!-- This is just bullshit output to make sure data is where it's supposed to be -->
    <!-- remove all this crap once we have proper computed properties to display -->
    <p>{{ usageDetails.distance }} körsträcka</p>
    <p>{{ usageDetails.gasPrice }} bensin/dieselpris</p>
    <p>{{ usageDetails.kwhPrice }} elpris</p>

    <p>Pris {{ selectedCars[0].name }}: {{ selectedCars[0].price }} kr</p>
    <p>Pris {{ selectedCars[1].name }}: {{ selectedCars[1].price }} kr</p>
    <!-- <h1>Pris/km bil 1: {{pricePerKmCarOne}}</h1>
    <h1>Pris/km bil 2: {{pricePerKmCarTwo}}</h1>-->
    <h1>Alla år bil 1: {{allYearTotalCarOne}} kr</h1>
    <h1>Alla år bil 2: {{allYearTotalCarTwo}} kr</h1>
    <h1>Första året total bil 1: {{firstYearTotalCarOne}} kr</h1>
    <h1>Första året total bil 2: {{firstYearTotalCarTwo}} kr</h1>
    <h1>{{ cheapestCar }} är {{ comparisonFirstYear }} kr billigare första året</h1>
    <!-- Replace all of the above with output from computed properties -->
  </div>
</template>

<script>
export default {
  props: ["usageDetails", "selectedCars"],
  computed: {
    taxCredit() {
      // if possible, calculate tax credit for green cars; otherwise make sure the database has this info
      return "";
    },
    pricePerTenKmCarOne() {
      let result = 0;
      let { kwhPrice, gasPrice } = this.usageDetails;
      let { type, consumption } = this.selectedCars[0];
      type === "electric"
        ? (result = (consumption * kwhPrice) / 10)
        : (result = (consumption * gasPrice) / 10);
      return result;
    },
    pricePerTenKmCarTwo() {
      let result = 0;
      let { kwhPrice, gasPrice } = this.usageDetails;
      let { type, consumption } = this.selectedCars[1];
      type === "electric"
        ? (result = (consumption * kwhPrice) / 10)
        : (result = (consumption * gasPrice) / 10);
      return result;
    },
    firstYearTotalCarOne() {
      let { distance } = this.usageDetails;
      let { price } = this.selectedCars[0];
      return Math.round(
        this.pricePerTenKmCarOne * distance + price - this.electricPremieCarOne
      );
    },
    firstYearTotalCarTwo() {
      let { distance } = this.usageDetails;
      let { price } = this.selectedCars[1];
      return Math.round(
        this.pricePerTenKmCarTwo * distance + price - this.electricPremieCarTwo
      );
    },
    allYearTotalCarOne() {
      let { distance, ownership } = this.usageDetails;
      let { price } = this.selectedCars[0];
      return (
        this.pricePerTenKmCarOne * distance * ownership +
        price -
        this.electricPremieCarOne
      );
    },
    allYearTotalCarTwo() {
      let { distance, ownership } = this.usageDetails;
      let { price } = this.selectedCars[1];
      return (
        this.pricePerTenKmCarTwo * distance * ownership +
        price -
        this.electricPremieCarTwo
      );
    },
    comparisonFirstYear() {
      let result = 0;
      this.firstYearTotalCarOne < this.firstYearTotalCarTwo
        ? (result = this.firstYearTotalCarTwo - this.firstYearTotalCarOne)
        : (result = this.firstYearTotalCarOne - this.firstYearTotalCarTwo);
      return result;
    },
    cheapestCar() {
      let cheapest = "";
      this.firstYearTotalCarOne < this.firstYearTotalCarTwo
        ? (cheapest = this.selectedCars[0].name)
        : (cheapest = this.selectedCars[1].name);
      return cheapest;
    },
    electricPremieCarOne() {
      return this.selectedCars[0].type === "electric" ? 60000 : 0;
    },
    electricPremieCarTwo() {
      return this.selectedCars[1].type === "electric" ? 60000 : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.cost-comparison {
  grid-column: 1 / -1;
}
</style>
