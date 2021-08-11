<template>
  <span>{{ formattedvalue }}{{ unit }}</span>
</template>

<script>
import { TweenLite } from 'gsap/TweenMax';

export default {
  props: {
    value: { type: Number, required: true },
    unit: { type: String, default: '' },
    decimals: { type: Number, required: false, default: 0 },
  },
  data() {
    return {
      tweeningValue: 0,
    };
  },
  mounted() {
    this.tweeningValue = this.value;
  },
  computed: {
    formattedvalue() {
      return this.tweeningValue.toLocaleString('sv-SE', {
        maximumFractionDigits: this.decimals,
      });
    },
  },
  watch: {
    value(newValue) {
      TweenLite.to(this.$data, 0.5, { tweeningValue: newValue });
    },
  },
};
</script>
