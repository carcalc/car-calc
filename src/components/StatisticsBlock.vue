<template>
  <div :class="name" class="stat-block">
    <h3 class="stat-block__title">{{ title }}</h3>
    <span class="stat-block__value">
      <TweenedNumber :value="value" :decimals="decimals" />
      <span class="stat-block__unit"> {{ unit }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TweenedNumber from '@/components/TweenedNumber.vue';

export default defineComponent({
  name: 'StatisticsBlock',
  components: { TweenedNumber },
  props: {
    title: { required: true, type: String },
    name: { required: true, type: String },
    unit: { required: true, type: String },
    value: { required: true, type: Number },
    decimals: { required: false, type: Number, default: 0 },
  },
});
</script>

<style lang="scss" scoped>
.stat-block {
  word-wrap: break-word;
  display: block;
  width: 100%;
  height: 100%;

  &__title {
    font-weight: bold;
    font-size: 0.8rem;

    @media screen and (min-width: $size-small-tablet) {
      font-size: 0.9rem;
    }

    @media screen and (min-width: $size-tablet) {
      font-size: 1rem;
    }
  }

  &__value {
    display: flex;
    align-items: baseline;
    font-weight: bold;
    gap: 2px;
    color: $black;
    font-size: 1.3rem;

    @media screen and (min-width: $size-small-tablet) {
      font-size: 1.4rem;
    }

    @media screen and (min-width: $size-tablet) {
      font-size: 1.8rem;
    }
  }

  &__unit {
    font-weight: bold;
    font-size: 0.5rem;

    @media screen and (min-width: $size-small-tablet) {
      font-size: 0.6rem;
    }

    @media screen and (min-width: $size-tablet) {
      font-size: 0.8rem;
    }
  }
}
</style>
