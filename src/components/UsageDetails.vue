<template>
  <form class="usage-form" @submit.prevent @input="$emit('change')">
    <label for="electricity-price">Elpris (kr/kWh)</label>
    <input
      type="number"
      name="electricity-price"
      step="any"
      min="0"
      v-model.number="usageDetails.kwhPrice"
      v-bind:placeholder="usageDetails.kwhPrice"
    />
    <label for="gas-price">Bensin-/dieselpris (kr/liter)</label>
    <input
      type="number"
      name="gas-price"
      step="any"
      min="0"
      v-model.number="usageDetails.gasPrice"
      v-bind:placeholder="usageDetails.gasPrice"
    />

    <label for="distance">Körsträcka (km/år)</label>
    <input
      name="distance"
      type="range"
      min="500"
      step="100"
      max="5000"
      v-model.number="usageDetails.distance"
      v-bind:placeholder="usageDetails.distance"
    />
    <span>{{ usageDetails.distance }} km</span>
    <label for="years">Planerat ägande (år)</label>
    <input
      name="years"
      type="range"
      min="1"
      max="10"
      v-model.number="usageDetails.ownership"
      v-bind:placeholder="usageDetails.ownership"
    />
    <span>{{ usageDetails.ownership }} år</span>
  </form>
</template>

<script>
export default {
  props: ['usageDetails'],
};
</script>

<style lang="scss" scoped>
.usage-form {
  grid-column: 1 / -1;
  padding: 4rem;
}
</style>
