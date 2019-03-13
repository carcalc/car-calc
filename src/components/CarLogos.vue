<template>
  <img :src="carName" alt="Car Logo" />
</template>

<script>
export default {
  name: 'CarLogos',
  props: {
    car: { type: Object, required: true },
  },
  data() {
    return {};
  },
  computed: {
    carName: function() {
      const name = this.car.name.split(' ')[0].toLowerCase();
      return require('../assets/' + name + '.svg');
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  height: 1.1rem;
  position: absolute;
  right: 35px;
  top: 10px;
  @media screen and (min-width: $size-tablet) {
    height: 2.5rem;
    left: 10px;
  }
}
</style>
