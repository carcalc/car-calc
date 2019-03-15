// Use this wherever we need animated numbers

<template>
  <span>{{ formattedvalue }}</span>
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
  computed: {
    formattedvalue: function() {
      return Math.round(this.tweeningValue).toLocaleString('sv-SE');
    },
  },
  watch: {
    value: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweeningValue: newValue });
    },
  },
};
</script>

<style></style>
