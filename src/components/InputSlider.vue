<script setup lang="ts">
export interface Props {
  modelValue: number;
  name?: string;
  step?: number;
  min?: number;
  max?: number;
}

withDefaults(defineProps<Props>(), {
  step: 1,
  min: undefined,
  max: undefined,
  name: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value);
</script>

<template>
  <input
    :name="name"
    :min="min"
    :max="max"
    :step="step"
    type="range"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<style lang="scss" scoped>
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
      @include thumb-focus;
    }
  }
}
</style>
