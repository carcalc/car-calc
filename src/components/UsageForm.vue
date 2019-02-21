// Refactor user behavior (travel distance etc) and gas/electric price to here (from
CarsSpecificationsForm)

<template>
  <div class="usage-form">
    <label for="electricityPrice">Elkostnad öre/kWh</label>
    <input
      type="number"
      step="any"
      v-model.number="pricing.kWhPrice"
      v-bind:placeholder="pricing.kWhPrice"
    />
    <label for="gasPrice">Bensin-/dieselpris kr/liter</label>
    <input
      type="number"
      step="any"
      v-model.number="pricing.gasPrice"
      v-bind:placeholder="pricing.gasPrice"
    />

    <h2>Körsträcka mil/år</h2>
    <input type="number" v-model.number="distance" v-bind:placeholder="distance" />
  </div>
</template>

<script>
export default {
  props: ['pricing', 'distance'],
};
</script>

<style lang="scss" scoped>
.usage-form {
  grid-column: 1 / -1;
}
</style>
