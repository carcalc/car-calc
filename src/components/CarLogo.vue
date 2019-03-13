<template>
  <img v-if="setSrc !== null" :src="setSrc" alt="Car Logo" />
</template>

<script>
export default {
  name: 'CarLogo',
  props: {
    carName: { type: String, required: true },
  },
  computed: {
    setSrc: function() {
      const name = this.carName.split(' ')[0].toLowerCase();
      try {
        return require(`../assets/carlogos/${name}.png`);
      } catch (e) {
        return null;
      }
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
    height: 2rem;
    left: 10px;
  }
}
</style>
