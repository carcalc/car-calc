<template>
  <div :class="name" class="input-block">
    <label class="input-title" :for="name">{{ title }} {{ unit }}</label>
    <input
      :name="name"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      lang="sv"
      class="input-display"
      type="range"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'InputBlockRange',
  props: {
    title: { required: true, type: Number },
    name: { required: true, type: String },
    unit: { required: true, type: String },
    modelValue: { required: true, type: Number },
    step: { type: Number, default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: undefined },
  },
  methods: {
    handleInput(e: Event) {
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-block {
  position: relative;
  font-style: italic;
  display: block;
  width: 100%;
  height: 100%;
}

.input-title {
  font-weight: bold;
  font-size: 0.8rem;
  position: absolute;
  top: 24px;
  left: 10px;
  font-style: italic;

  @media screen and (min-width: $size-small-tablet) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: $size-tablet) {
    font-size: 1rem;
  }

  @media screen and (min-width: $size-tablet) {
    position: initial;
  }
}

/* Range Reset */
input[type='range'] {
  @mixin track {
    background-color: $input-bg;
    border-radius: 0.5rem;
    height: 0.5rem;
  }

  @mixin thumb {
    background-color: $brand-color2;
    height: 16px;
    width: 6px;
    border-radius: 2px;
  }

  @mixin thumb-focus {
    border: 1px solid $input-bg;
    outline: 3px solid $input-bg;
    outline-offset: 0.125rem;
  }

  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;

  // Chrome, Safari, Opera and Edge Chromium styles
  &::-webkit-slider {
    &-thumb {
      appearance: none;
      margin-top: -4px; /* Centers thumb on the track */

      @include thumb;
    }

    &-runnable-track {
      @include track;
    }
  }

  // Firefox
  &::-moz-range {
    &-thumb {
      border: none; /* Removes extra border that FF applies */
      border-radius: 0; /* Removes default border-radius that FF applies */

      @include thumb;
    }

    &-track {
      @include track;
    }
  }

  &:focus {
    outline: none;

    &::-webkit-slider-thumb,
    &::-moz-range-thumb {
      @include thumb--focus;
    }
  }
}
</style>
