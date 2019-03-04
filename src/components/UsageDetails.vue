<template>
  <form class="usage-details" @submit.prevent>
    <h1 class="card-title">Priser</h1>
    <fieldset class="stat-block electricity-price">
      <label class="block-title" for="electricity-price">
        Elpris
        <input
          class="big-number"
          lang="sv"
          type="number"
          name="electricity-price"
          step="any"
          min="0"
          v-model.number="usage.kwhPrice"
          :placeholder="usage.kwhPrice"
        />
        <span class="big-number-unit">
          kr/kWh
        </span>
      </label>
    </fieldset>
    <fieldset class="stat-block gas-price">
      <label class="block-title" for="gas-price">
        Bensin/dieselpris
        <input
          class="big-number"
          lang="sv"
          type="number"
          name="gas-price"
          step="any"
          min="0"
          v-model.number="usage.gasPrice"
          :placeholder="usage.gasPrice"
        />
        <span class="big-number-unit">
          kr/l
        </span>
      </label>
    </fieldset>
    <fieldset class="stat-block distance">
      <label class="block-title" for="distance"> {{ usage.distance / 10 }} mil per år </label>
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
    </fieldset>
    <fieldset class="stat-block years">
      <label class="block-title" for="years"> {{ usage.ownership }} års ägande </label>
      <input
        lang="sv"
        name="years"
        type="range"
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
  @include card-style;
  grid-area: usage;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'title  title'
    'electricity gas'
    'distance years';

  @media screen and (min-width: 650px) {
    // Tablet layout
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'title title title'
      'electricity gas distance'
      'electricity gas years';
  }
  @media screen and (min-width: 1200px) {
    // Desktop layout
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'electricity'
      'gas'
      'distance'
      'years';
  }

  .stat-block {
    @include stat-block;

    &.electricity-price {
      grid-area: electricity;
    }
    &.gas-price {
      grid-area: gas;
    }
    &.distance {
      grid-area: distance;
    }
    &.years {
      grid-area: years;
    }
  }
}
</style>
