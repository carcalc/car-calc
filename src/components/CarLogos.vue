<template>
  <div class="car-logo">
    <img :src="carLogo()" alt="Car Logo" />
  </div>
</template>

<script>
export default {
  name: 'CarLogos',
  props: {
    carName: { type: String, required: true },
  },
  methods: {
    carLogo() {
      const name = this.carName;
      let src;

      switch (true) {
        case name.includes('Mercedes'):
          src = 'mercedes';
          break;
        case name.includes('Volvo'):
          src = 'volvo';
          break;
        case name.includes('Kia'):
          src = 'kia';
          break;
        case name.includes('Nissan'):
          src = 'nissan';
          break;
        case name.includes('Volkswagen'):
          src = 'volkswagen';
          break;
        case name.includes('Tesla'):
          src = 'tesla';
          break;
        case name.includes('Citro'):
          src = 'citroen';
          break;
        case name.includes('Peugeot'):
          src = 'peugeot';
          break;
        case name.includes('Renault'):
          src = 'renault';
          break;
        case name.includes('Smart'):
          src = 'smart-car';
          break;
        case name.includes('Jeep'):
          src = 'jeep';
          break;
        case name.includes('Hyundai'):
          src = 'hyundai';
          break;
        case name.includes('Opel'):
          src = 'opel';
          break;
        case name.includes('Ford'):
          src = 'ford';
          break;
        case name.includes('Fiat'):
          src = 'fiat';
          break;
        case name.includes('BMW'):
          src = 'bmw';
          break;
        case name.includes('Alfa Romeo'):
          src = 'alfa-romeo';
          break;
        case name.includes('Audi'):
          src = 'audi';
          break;
        default:
          src = 'default-car-logo';
      }
      return require(`../assets/${src}.svg`);
    },
  },
};
</script>
<style lang="scss" scoped>
.car-logo {
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
}
</style>
