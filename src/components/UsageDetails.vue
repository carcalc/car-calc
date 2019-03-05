<template>
  <form class="usage-details" @submit.prevent>
    <fieldset class="stat-block electricity-price">
      <label class="stat-title" for="electricity-price">Elpris</label>
      <input
        class="stat-display"
        lang="sv"
        type="number"
        name="electricity-price"
        step="any"
        min="0"
        v-model.number="usage.kwhPrice"
        :placeholder="usage.kwhPrice"
      />
      <span class="stat-display-unit">kr/kWh</span>
    </fieldset>
    <fieldset class="stat-block gas-price">
      <label class="stat-title" for="gas-price">Bensin/dieselpris</label>
      <input
        class="stat-display"
        lang="sv"
        type="number"
        name="gas-price"
        step="any"
        min="0"
        v-model.number="usage.gasPrice"
        :placeholder="usage.gasPrice"
      />
      <span class="stat-display-unit">
        kr/l
      </span>
    </fieldset>
    <fieldset class="stat-block distance">
      <label class="stat-title" for="distance"> {{ usage.distance / 10 }} mil per år </label>
      <input
        lang="sv"
        name="distance"
        type="range"
        class="stat-display"
        min="5000"
        step="100"
        max="50000"
        v-model.number="usage.distance"
        :placeholder="usage.distance"
      />
    </fieldset>
    <fieldset class="stat-block years">
      <label class="stat-title" for="years"> {{ usage.ownership }} års ägande </label>
      <input
        lang="sv"
        name="years"
        type="range"
        class="stat-display"
        min="1"
        max="10"
        v-model.number="usage.ownership"
        :placeholder="usage.ownership"
      />
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
  @include card-style();

  grid-area: usage;
  display: grid;
  align-items: flex-start;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'electricity gas'
    'distance years';

  @media screen and (min-width: $size-tablet) {
    // Tablet layout
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-areas:
      'electricity gas distance'
      'electricity gas years';
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

  .stat-block {
    &.electricity-price {
      @include input-stat-block();
      grid-area: electricity;
    }
    &.gas-price {
      @include input-stat-block();
      grid-area: gas;
    }
    &.distance {
      @include fixed-stat-block();
      grid-area: distance;
    }
    &.years {
      @include fixed-stat-block();
      grid-area: years;
    }
  }
}
</style>
