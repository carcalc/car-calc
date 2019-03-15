// Reusable component for wherever we need animated numbers

<template>
  <span>{{ value }} {{ tweeningValue }}</span>
</template>

<script>
import { TweenLite } from 'gsap/TweenMax';

export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data: function() {
    return {
      tweeningValue: 0,
    };
  },
  mounted: function() {
    this.tweeningValue = this.value;
  },
  watch: {
    value: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweeningValue: newValue });
    },
  },
};
</script>

<style></style>
