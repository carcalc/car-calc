<template>
  <div class="car-intro">
    <CarLogo :carName="car.name" />
    <h1 class="car-name">
      {{ car.name }}
    </h1>
    <h3 class="car-specs">
      {{ car.specs }}
    </h3>
  </div>
</template>

<script>
import CarLogo from '@/components/CarLogo';

export default {
  name: 'CarIntro',
  components: { CarLogo },
  props: { car: { type: Object, required: true } },
};
</script>

<style lang="scss" scoped>
.car-intro {
  grid-area: intro;
}

.car-name {
  display: inline;
  font-weight: bold;
  font-size: 1rem;
  @media screen and (min-width: $size-tablet) {
    display: block;
    text-align: center;
    font-size: 2rem;
  }
}

.car-specs {
  display: inline;
  font-size: 0.8rem;
  text-align: right;

  @media screen and (min-width: $size-tablet) {
    display: block;
    text-align: center;
    font-size: 1.2rem;
  }
}
</style>
