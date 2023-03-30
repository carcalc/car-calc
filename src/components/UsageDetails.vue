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

    <InputLabel :text="`${localValue.distance / 10} mil per år`">
      <InputSlider v-model.number="localValue.distance" :step="1000" :min="5000" :max="50000" />
    </InputLabel>

    <InputLabel :text="`${localValue.ownership} års ägande`">
      <InputSlider v-model.number="localValue.ownership" :step="1" :min="1" :max="20" />
    </InputLabel>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import InputBlockNumber from '@/components/InputBlockNumber.vue';
import InputLabel from '@/components/InputLabel.vue';
import InputSlider from '@/components/InputSlider.vue';

export default defineComponent({
  name: 'UsageDetails',
  components: { InputLabel, InputSlider, InputBlockNumber },
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
  display: grid;
  gap: $gutter-sm;
  grid-template-areas:
    'electricity gas'
    'distance years';

  @media screen and (min-width: $size-tablet) {
    gap: $gutter-lg;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: 'electricity gas distance years';
  }

  @media screen and (min-width: $size-desktop) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'electricity'
      'gas'
      'distance'
      'years';
  }
}
</style>
