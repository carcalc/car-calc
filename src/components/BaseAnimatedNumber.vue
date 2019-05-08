<template>
  <span>{{ formattedvalue }}</span>
</template>

<script>
import { TweenLite } from 'gsap/TweenMax';

export default {
  props: {
    value: { type: Number, required: true },
    decimals: { type: Number, required: false, default: 0 },
  },
  data: function() {
    return {
      tweeningValue: 0,
    };
  },
  mounted: function() {
    this.tweeningValue = this.value;
  },
  computed: {
    formattedvalue: function() {
      return this.tweeningValue.toLocaleString('sv-SE', {
        maximumFractionDigits: this.decimals,
      });
    },
  },
  watch: {
    value: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweeningValue: newValue });
    },
  },
};
</script>
