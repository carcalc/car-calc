<template>
  <i class="climate-dot fas fa-leaf" :class="co2Index"></i>
</template>

<script>
export default {
  name: 'ClimateIndicator',
  props: { car: { type: Object, required: true } },
  computed: {
    co2Index: function() {
      const { type, co2, consumption } = this.car;

      if (co2 > 90 || type === 'electric') {
        return 'green';
      } else if (co2 > 75 || consumption < 4.5) {
        return 'yellow';
      } else if (co2 > 60 || consumption < 6.5) {
        return 'orange';
      } else if (co2 > 0 || consumption >= 6.5) {
        return 'red';
      } else {
        return 'none';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.climate-dot {
  z-index: 5;
  font-size: 0.8rem;
  @media screen and (min-width: $size-tablet) {
    font-size: 1rem;
  }

  &.green {
    color: #0ecb92;
  }
  &.yellow {
    color: #f3e11d;
  }
  &.orange {
    color: rgb(255, 174, 0);
  }
  &.red {
    color: #d82607;
  }
  &.none {
    display: none;
  }
}
</style>
