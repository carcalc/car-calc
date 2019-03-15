<template>
  <form class="usage-details" @submit.prevent>
    <InputBlockNumber
      title="Elpris"
      name="electricity-price"
      unit="kr/kWh"
      :step="0.01"
      :min="0"
      :maxLength="5"
      v-model.number="usage.kwhPrice"
    />

    <InputBlockNumber
      title="Bensin/dieselpris"
      name="gas-price"
      unit="kr/l"
      :step="0.01"
      :min="0"
      :maxLength="5"
      v-model.number="usage.gasPrice"
    />

    <InputBlockRange
      :title="usage.distance / 10"
      unit="mil per år"
      name="distance"
      :step="1000"
      :min="5000"
      :max="50000"
      v-model.number="usage.distance"
    />

    <InputBlockRange
      :title="usage.ownership"
      unit="års ägande"
      name="years"
      :step="1"
      :min="1"
      :max="10"
      v-model.number="usage.ownership"
    />
  </form>
</template>

<script>
import InputBlockNumber from '@/components/InputBlockNumber';
import InputBlockRange from '@/components/InputBlockRange';

export default {
  name: 'UsageDetails',
  components: { InputBlockRange, InputBlockNumber },
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
