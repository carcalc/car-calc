<template>
  <form class="usage-form" @submit.prevent>
    <label for="electricity-price">Elpris (kr/kWh)</label>
    <input
      type="number"
      name="electricity-price"
      step="any"
      min="0"
      v-model.number="usage.kwhPrice"
      :placeholder="usage.kwhPrice"
    />
    <label for="gas-price">Bensin-/dieselpris (kr/liter)</label>
    <input
      type="number"
      name="gas-price"
      step="any"
      min="0"
      v-model.number="usage.gasPrice"
      :placeholder="usage.gasPrice"
    />

    <label for="distance">Körsträcka</label>
    <input
      name="distance"
      type="range"
      min="500"
      step="100"
      max="5000"
      v-model.number="usage.distance"
      :placeholder="usage.distance"
    />
    <span>{{ usage.distance }} km/år</span>
    <label for="years">Planerat ägande</label>
    <input
      name="years"
      type="range"
      min="1"
      max="10"
      v-model.number="usage.ownership"
      :placeholder="usage.ownership"
    />
    <span>{{ usage.ownership }} år</span>
  </form>
</template>

<script>
export default {
  props: ['usageDetails'],
  data() {
    return { usage: this.usageDetails };
  },
  updated() {
    localStorage.setItem('usageDetails', JSON.stringify(this.usageDetails));
  },
};
</script>

<style lang="scss" scoped>
.usage-form {
  grid-column: 1 / -1;
  padding: 4rem;
  margin: 2rem;
}
</style>
