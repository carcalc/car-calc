<template>
  <div class="car-logo">
    <img :src="carLogo()" alt="Car Logo" />
  </div>
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
  methods: {
    carLogo() {
      const { name } = this.car;

      switch (true) {
        case name.includes('Mercedes'):
          return require('../assets/mercedes.svg');
        case name.includes('Volvo'):
          return require('../assets/volvo.svg');
        case name.includes('Kia'):
          return require('../assets/kia.svg');
        case name.includes('Nissan'):
          return require('../assets/nissan.svg');
        case name.includes('Volkswagen'):
          return require('../assets/volkswagen.svg');
        case name.includes('Tesla'):
          return require('../assets/tesla.svg');
        case name.includes('Citro'):
          return require('../assets/citroen.svg');
        case name.includes('Peugeot'):
          return require('../assets/peugeot.svg');
        case name.includes('Renault'):
          return require('../assets/renault.svg');
        case name.includes('Smart'):
          return require('../assets/smart-car.svg');
        case name.includes('Jeep'):
          return require('../assets/jeep.svg');
        case name.includes('Hyundai'):
          return require('../assets/hyundai.svg');
        case name.includes('Opel'):
          return require('../assets/opel.svg');
        case name.includes('Ford'):
          return require('../assets/ford.svg');
        case name.includes('Fiat'):
          return require('../assets/fiat.svg');
        case name.includes('BMW'):
          return require('../assets/bmw.svg');
        case name.includes('Alfa Romeo'):
          return require('../assets/alfa-romeo.svg');
        case name.includes('Audi'):
          return require('../assets/audi.svg');
        default:
          return require('../assets/default-car-logo.svg');
      }
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
