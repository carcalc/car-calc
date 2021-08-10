<template>
  <div class="fuel-selector">
    <h3 class="title">{{ title }}</h3>
    <div class="fuel-display">
      <input lang="sv" type="radio" name="electric" value="electric" v-model="fuelType" />
      <label for="electric">
        <i class="fas fa-bolt fa-lg"></i>
      </label>
      <input lang="sv" type="radio" name="gasoline" value="gasoline" v-model="fuelType" />
      <label for="gasoline">
        <i class="fas fa-gas-pump fa-lg"></i>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FuelSelector',
  props: { value: { required: true, type: Boolean }, title: { required: true, type: String } },
  data() {
    return { fuelType: null };
  },
  mounted() {
    this.fuelType = this.value ? 'electric' : 'gasoline';
  },
  watch: {
    value() {
      this.fuelType = this.value ? 'electric' : 'gasoline';
    },
    fuelType() {
      this.$emit('input', this.fuelType === 'electric');
    },
  },
};
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
  position: absolute;
  top: 5px;
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
  border-radius: $border-radius;
  border: 3px solid transparent;
  background-color: $input-bg;
  line-height: 0;
  font-style: italic;
  outline: none;
  padding: 20px 12px 0px 7px;
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
}
.fuel-display-unit {
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
</style>
