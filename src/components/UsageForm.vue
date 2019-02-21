// Refactor user behavior (travel distance etc) and gas/electric price to here (from
CarsSpecificationsForm)

<template>
  <div class="usage-form">
    <label for="electricity-price">Elpris (kr/kWh)</label>
    <input
      type="number"
      name="electricity-price"
      step="any"
      v-model.number="pricing.kWhPrice"
      v-bind:placeholder="pricing.kWhPrice"
    >
    <label for="gas-price">Bensin-/dieselpris (kr/liter)</label>
    <input
      type="number"
      name="gas-price"
      step="any"
      v-model.number="pricing.gasPrice"
      v-bind:placeholder="pricing.gasPrice"
    >
    
    <label for="distance">Körsträcka (km/år)</label>
    <input name="distance" type="number" v-model.number="distance" v-bind:placeholder="distance">
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
  padding: 4rem;
}
</style>
