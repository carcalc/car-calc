// Refactor all cost comparisons to here (from CarsSpecificationsForm)

<template>
  <div class="cost-comparison">-här hamnar besparingar och grafer-
    <!-- This is just bullshit output to make sure data is where it's supposed to be -->
    <!-- remove all this crap once we have proper computed properties to display -->
    <p>{{usageDetails.distance}} körsträcka</p>
    <p>{{usageDetails.gasPrice}} bensin/dieselpris</p>
    <p>{{usageDetails.kWhPrice}} elpris</p>
    <p>Pris {{car1.name}}: {{car1.price}} SEK</p>
    <p>Pris {{car2.name}}: {{car2.price}} SEK</p>
    <!-- Replace all of the above with output from computed properties -->
  </div>
</template>

<script>
export default {
  props: ['usageDetails', 'car1', 'car2'],
  computed: {
    pricePerKm() {
      // Put all calculations in computed properties like these
    },
  },
};

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
