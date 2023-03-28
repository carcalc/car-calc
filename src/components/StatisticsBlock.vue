<template>
  <div :class="name" class="stat-block">
    <h3 class="stat-title">{{ title }}</h3>
    <span class="stat-display">
      <BaseAnimatedNumber :value="value" :decimals="decimals" />
      <span class="stat-display-unit"> {{ unit }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'StatisticsBlock',
  props: {
    title: { required: true, type: String },
    name: { required: true, type: String },
    unit: { required: true, type: String },
    value: { required: true, type: Number },
    decimals: { required: false, type: Number, default: 0 },
  },
};
</script>

<style lang="scss" scoped>
.stat-block {
  word-wrap: break-word;
  display: block;
  width: 100%;
  height: 100%;
}

.stat-title {
  font-weight: bold;
  font-size: 0.8rem;

  @media screen and (min-width: $size-small-tablet) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: $size-tablet) {
    font-size: 1rem;
  }
}

.stat-display {
  width: 100%;
  height: 100%;
  font-weight: bold;
  color: $black;
  margin: 0;
  border: none;
  font-size: 1.3rem;

  @media screen and (min-width: $size-small-tablet) {
    font-size: 1.4rem;
  }

  @media screen and (min-width: $size-tablet) {
    font-size: 1.8rem;
  }

  &-unit {
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
