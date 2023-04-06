<template>
  <img v-if="imageSource" :src="imageSource" :alt="carBrand + 'logotyp'" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CarLogo',
  props: {
    carName: { type: String, required: true },
  },
  computed: {
    carBrand() {
      return this.carName.split(' ')[0].toLowerCase();
    },
    imageSource() {
      try {
        return new URL(`../assets/carlogos/${this.carBrand}.png`, import.meta.url).href;
      } catch (e) {
        return null;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
img {
  height: 1.1rem;
  position: absolute;
  right: 10px;
  top: 10px;

  @media screen and (min-width: $size-tablet) {
    height: 2rem;
    left: 10px;
  }
}
</style>
