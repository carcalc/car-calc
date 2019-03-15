<template>
  <form class="usage-details" @submit.prevent>
    <div class="input-block electricity-price">
      <label class="input-title" for="electricity-price">Elpris</label>
      <input
        class="input-display"
        lang="sv"
        type="number"
        name="electricity-price"
        step=".01"
        min="0"
        v-model.number="usage.kwhPrice"
      />
      <span class="input-display-unit">kr/kWh</span>
    </div>
    <div class="input-block gas-price">
      <label class="input-title" for="gas-price">Bensin/dieselpris</label>
      <input
        class="input-display"
        lang="sv"
        type="number"
        name="gas-price"
        step=".01"
        min="0"
        v-model.number="usage.gasPrice"
      />
      <span class="input-display-unit">
        kr/l
      </span>
    </div>
    <div class="input-block distance">
      <label class="input-title" for="distance"> {{ usage.distance / 10 }} mil per år </label>
      <input
        lang="sv"
        name="distance"
        type="range"
        class="input-display"
        min="5000"
        step="1000"
        max="50000"
        v-model.number="usage.distance"
      />
    </div>
    <div class="input-block years">
      <label class="input-title" for="years"> {{ usage.ownership }} års ägande </label>
      <input
        lang="sv"
        name="years"
        type="range"
        class="input-display"
        min="1"
        max="10"
        v-model.number="usage.ownership"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: { usageDetails: { type: Object, required: true } },
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
  @include card-style();
  padding-bottom: 1.5rem;
  grid-area: usage;
  display: grid;
  grid-template-areas:
    'electricity gas'
    'distance years';

  @media screen and (min-width: $size-tablet) {
    // Tablet layout
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: 'electricity gas distance years';
  }
  @media screen and (min-width: $size-desktop) {
    // Desktop layout
    grid-template-columns: 1fr;
    grid-template-areas:
      'electricity'
      'gas'
      'distance'
      'years';
  }
}

.input-block {
  @include full-input-block();
  // All based on above mixin; custom style overrides below
  &.years,
  &.distance {
    position: relative;
    font-style: italic;
    display: block;
    width: 100%;
    height: 100%;
    .input-title {
      position: absolute;
      top: 24px;
      @media screen and (min-width: $size-tablet) {
        position: initial;
      }
    }
    .input-display {
      font-size: 1rem;
    }
  }
  &.gas-price {
    grid-area: gas;
  }
  &.electricity-price {
    grid-area: electricity;
  }
  &.distance {
    grid-area: distance;
  }
  &.years {
    grid-area: years;
  }
}
</style>
