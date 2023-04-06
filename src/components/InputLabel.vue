<script setup lang="ts">
export interface Props {
  text: string;
  tag?: string;
}

withDefaults(defineProps<Props>(), { tag: 'label' });
</script>

<template>
  <component :is="tag" class="input-label">
    {{ text }}
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.input-label {
  font-weight: bold;
  font-size: 0.8rem;
  font-style: italic;

  @media screen and (min-width: $size-small-tablet) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: $size-tablet) {
    font-size: 1rem;
  }
}
</style>
