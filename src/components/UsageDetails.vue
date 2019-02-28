<template>
  <form class="usage-form" @submit.prevent>
    <label for="electricity-price">Elpris</label>
    <input
      lang="sv"
      type="number"
      name="electricity-price"
      step="any"
      min="0"
      v-model.number="usage.kwhPrice"
      :placeholder="usage.kwhPrice"
    />
    <span>kr/kWh</span>
    <label for="gas-price">Bensin-/dieselpris</label>
    <input
      lang="sv"
      type="number"
      name="gas-price"
      step="any"
      min="0"
      v-model.number="usage.gasPrice"
      :placeholder="usage.gasPrice"
    />
    <span>kr/liter</span>
    <label for="distance">Körsträcka</label>
    <input
      lang="sv"
      name="distance"
      type="range"
      min="5000"
      step="100"
      max="50000"
      v-model.number="usage.distance"
      :placeholder="usage.distance"
    />
    <span>{{ usage.distance / 10 }} mil/år</span>
    <label for="years">Planerat ägande</label>
    <input
      lang="sv"
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
    localStorage.setItem('usage', JSON.stringify(this.usageDetails));
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
