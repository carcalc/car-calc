<template>
  <div class="fuel-selector">
    <h3 class="title">{{ title }}</h3>
    <div class="fuel-display">
      <input v-model="fuelType" lang="sv" type="radio" name="electric" value="electric" />
      <label for="electric">
        <i class="fa-bolt fa-lg fas" />
      </label>
      <input v-model="fuelType" lang="sv" type="radio" name="gasoline" value="gasoline" />
      <label for="gasoline">
        <i class="fa-gas-pump fa-lg fas" />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { Fuel } from '@/types';

export default defineComponent({
  name: 'FuelSelector',
  props: { modelValue: { required: true, type: Boolean }, title: { required: true, type: String } },
  emits: ['update:modelValue'],
  data(): { fuelType: Fuel } {
    return { fuelType: 'gasoline' };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.fuelType = newVal ? 'electric' : 'gasoline';
      },
    },
    fuelType() {
      const isEv = this.fuelType === 'electric';
      this.$emit('update:modelValue', isEv);
    },
  },
});
</script>

<style lang="scss" scoped>
.fuel-selector {
  position: relative;
  height: 60px;

  @media screen and (min-width: $size-small-tablet) {
    height: 70px;
  }

  @media screen and (min-width: $size-tablet) {
    height: 90px;
  }
}

.title {
  font-weight: bold;
  font-size: 0.8rem;
  top: 5px;
  position: absolute;
  left: 10px;
  font-style: italic;

  @media screen and (min-width: $size-small-tablet) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: $size-tablet) {
    font-size: 1rem;
  }
}

.fuel-display {
  width: 100%;
  height: 100%;
  font-weight: bold;
  color: $black;
  margin: 0;
  border-radius: $border-radius-lg;
  border: 3px solid transparent;
  background-color: $input-bg;
  line-height: 0;
  font-style: italic;
  outline: none;
  padding: 20px 12px 0 7px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.8rem;

  @media screen and (min-width: $size-tablet) {
    font-size: 1rem;
  }

  &:focus,
  &:hover {
    caret-color: $brand-color2;
    border: $input-focus-border;
  }

  &-unit {
    font-style: italic;
    position: absolute;
    margin: 0;
    bottom: 3px;
    right: 10px;
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
