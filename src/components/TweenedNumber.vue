<template>
  <span>{{ formattedvalue }}{{ unit }}</span>
</template>

<script lang="ts">
import { TweenLite } from 'gsap/TweenMax';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TweenedNumber',
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
  mounted() {
    this.tweeningValue = this.value;
  },
});
</script>
