<template>
  <form class="usage-details" @submit.prevent>
    <InputBlockNumber
      v-model.number="localValue.kwhPrice"
      title="Elpris"
      name="electricity-price"
      unit="kr/kWh"
      :step="0.01"
      :min="0"
      :max-length="5"
    />

    <InputBlockNumber
      v-model.number="localValue.gasPrice"
      title="Bensin/dieselpris"
      name="gas-price"
      unit="kr/l"
      :step="0.01"
      :min="0"
      :max-length="5"
    />

    <InputBlockRange
      v-model.number="localValue.distance"
      :title="localValue.distance / 10"
      unit="mil per år"
      name="distance"
      :step="1000"
      :min="5000"
      :max="50000"
    />

    <InputBlockRange
      v-model.number="localValue.ownership"
      :title="localValue.ownership"
      unit="års ägande"
      name="years"
      :step="1"
      :min="1"
      :max="20"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import InputBlockNumber from '@/components/InputBlockNumber.vue';
import InputBlockRange from '@/components/InputBlockRange.vue';

export default defineComponent({
  name: 'UsageDetails',
  components: { InputBlockRange, InputBlockNumber },
  props: { modelValue: { type: Object, required: true } },
  emits: ['update:modelValue'],
  data() {
    return { localValue: { ...this.modelValue } };
  },
  watch: {
    localValue: {
      handler() {
        this.$emit('update:modelValue', this.localValue);
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.usage-details {
  @include card-style;

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
