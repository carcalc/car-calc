<template>
  <form class="usage-details" @submit.prevent>
    <fieldset class="prices">
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
        kr/kWh
      </label>
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
        kr/liter
      </label>
    </fieldset>
    <fieldset class="usage">
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
        {{ usage.distance / 10 }} mil/år
      </label>
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
        {{ usage.ownership }} år
      </label>
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
.usage-details {
  grid-area: usage;
  // display: flex;
  padding: var(--card-gap);
  box-shadow: var(--card-shadow);
  border-radius: var(--card-radius);
}
</style>
