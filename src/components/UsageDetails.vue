<template>
  <form class="usage-form" @submit.prevent>
    <fieldset>
      <legend>Priser</legend>
      <label for="electricity-price">
        Elpris
        <input
          lang="sv"
          type="number"
          name="electricity-price"
          step="any"
          min="0"
          v-model.number="usage.kwhPrice"
          :placeholder="usage.kwhPrice"
        />
      </label>
      <span>kr/kWh</span>
      <label for="gas-price">
        Bensin-/dieselpris
        <input
          lang="sv"
          type="number"
          name="gas-price"
          step="any"
          min="0"
          v-model.number="usage.gasPrice"
          :placeholder="usage.gasPrice"
        />
      </label>
      <span>kr/liter</span>
    </fieldset>
    <fieldset>
      <legend>Brukande</legend>
      <label for="distance">
        Körsträcka
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
      </label>
      <span>{{ usage.distance / 10 }} mil/år</span>
      <label for="years">
        Planerat ägande
        <input
          lang="sv"
          name="years"
          type="range"
          min="1"
          max="10"
          v-model.number="usage.ownership"
          :placeholder="usage.ownership"
        />
      </label>
      <span>{{ usage.ownership }} år</span>
    </fieldset>
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
