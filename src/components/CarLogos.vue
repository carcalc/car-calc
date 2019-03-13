<template>
  <img :src="setLogo" alt="Car Logo" />
</template>

<script>
export default {
  name: 'CarLogos',
  props: {
    carName: { type: String, required: true },
  },
  data() {
    return {};
  },
  computed: {
    setLogo: function() {
      const name = this.carName.split(' ')[0].toLowerCase();
      return require(`../assets/${name}.svg`);
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
