// Refactor all cost comparisons to here (from CarsSpecificationsForm)

<template>
  <div class="cost-comparison">-här hamnar besparingar och grafer-</div>
</template>

<script>
export default {};

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
