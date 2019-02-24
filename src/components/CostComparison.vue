<template>
  <div class="cost-comparison">-här hamnar besparingar och grafer-
    <!-- This is just bullshit output to make sure data is where it's supposed to be -->
    <!-- remove all this crap once we have proper computed properties to display -->
    <p>{{ usageDetails.distance }} körsträcka</p>
    <p>{{ usageDetails.gasPrice }} bensin/dieselpris</p>
    <p>{{ usageDetails.kwhPrice }} elpris</p>

    <p>Pris {{ selectedCars[0].name }}: {{ selectedCars[0].price }} kr</p>
    <p>Pris {{ selectedCars[1].name }}: {{ selectedCars[1].price }} kr</p>

    <h1>{{firstYearTotalCarOne}}</h1>
    <h1>{{firstYearTotalCarTwo}}</h1>
    <h1>{{ cheapestCar }} är {{ comparisonFirstYear }} kr billigare</h1>
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
    pricePerKm() {
      // Put all calculations in computed properties like these
      return "";
    },
    firstYearTotalCarOne() {
      let { kwhPrice, gasPrice, distance, ownership } = this.usageDetails;
      let { name, price, type, consumption } = this.selectedCars[0];
      return Math.round(
        type === "electric"
          ? kwhPrice * distance * consumption + price - 60000
          : gasPrice * distance * consumption + price
      );
    },
    firstYearTotalCarTwo() {
      let { kwhPrice, gasPrice, distance, ownership } = this.usageDetails;
      let { name, price, type, consumption } = this.selectedCars[1];
      return Math.round(
        type === "electric"
          ? kwhPrice * distance * consumption + price - 60000
          : gasPrice * distance * consumption + price
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
    }
  }
};

// Maybe reuse these calculations as Computed Properties above

//   if (type === 'gasoline') {
//     this.tenKmCost = gasPrice * consumption;
//     this.yearCost = distance * consumption * gasPrice;
//     this.oneYearCostTotal = distance * consumption * gasPrice + price;
//     this.$emit('dataToParent', this.oneYearCostTotal);
//   } else if (type === 'electric') {
//     this.tenKmCost = (electricityPrice / 10) * consumption;
//     this.yearCost = distance * consumption * (electricityPrice / 10);
//     this.oneYearCostTotal =
//       distance * consumption * (electricityPrice / 10) + price - premieElectric;
//     this.$emit('dataToParent', this.oneYearCostTotal);
//   }
// },

// Cut from CarsComparison; maybe reuse
// compare() {
//   // Move all this to CostComparison component
//   if (this.formDataOne > this.formDataTwo) {
//     const result = this.formDataOne - this.formDataTwo;
//     this.output = `Bil 1 är' ${result} kr dyrare än bil 2`;
//   } else {
//     const result = this.formDataTwo - this.formDataOne;
//     this.output = `Bil 2 är ${result} kr dyrare än bil 1 första året`;
//   }
// },
</script>

<style lang="scss" scoped>
.cost-comparison {
  grid-column: 1 / -1;
}
</style>
