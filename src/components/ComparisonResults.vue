<template>
  <section class="cars-results">
    <transition-group name="fade">
      <div v-if="totalSavings < 100" key="animation-1">
        <p class="highlight">Båda bilarna kostar lika mycket.</p>
        <p>Vad är oddsen liksom?</p>
      </div>
      <div v-else key="animation-2">
        <p>
          <span class="highlight">{{ cheapestCar.name }}</span> är billigast och utgör en
          <span class="highlight">
            total besparing på
            <TweenedNumber :value="totalSavings" unit=" kr" />
          </span>
          (eller
          <TweenedNumber :value="totalSavingsPercent" unit="%" />) jämfört med
          {{ mostExpensiveCar.name }}.
        </p>

        <p>
          <span class="highlight"> {{ cheapestCarToRun.name }}</span>
          {{ cheapestCar === cheapestCarToRun ? 'är också' : 'är dock' }}
          <span class="highlight">
            <TweenedNumber :value="fuelSavings" unit=" kr" /> billigare i drift
          </span>
          över
          <TweenedNumber :value="usage.ownership" unit=" år" />
          och
          <TweenedNumber :value="totalDistance / 10" unit=" mil" />
        </p>
      </div>

      <small key="animation-3" class="disclaimer">
        Uträkningen avser bilens inköpspris samt energiförbrukning och tar inte hänsyn till
        exempelvis skatt, värdeminskning och servicekostnader. Dessa är svåra att estimera korrekt
        och vi har därför för närvarande valt att utelämna dem.
        <router-link :to="{ name: 'about' }">Läs mer om hur vi har resonerat.</router-link>
      </small>
    </transition-group>
  </section>
</template>

<script>
import TweenedNumber from '@/components/TweenedNumber.vue';

export default {
  name: 'ComparisonResults',
  components: { TweenedNumber },
  props: {
    usage: { type: Object, required: true },
    cars: { type: Array, required: true },
  },
  computed: {
    fuelCostsPerKm() {
      const { gasPrice, kwhPrice } = this.usage;
      return this.cars.map((car) => {
        return (car.consumption * (car.isEv ? kwhPrice : gasPrice)) / 100;
      });
    },
    totalFuelCosts() {
      const { distance, ownership } = this.usage;
      return this.cars.map((_, index) =>
        Math.round(this.fuelCostsPerKm[index] * distance * ownership),
      );
    },
    totalOwnershipCosts() {
      return this.cars.map((car, index) => {
        const cost = this.totalFuelCosts[index] + car.price;
        return cost;
      });
    },
    totalDistance() {
      return this.usage.distance * this.usage.ownership;
    },
    fuelSavings() {
      const [carOne, carTwo] = this.totalFuelCosts;
      if (carOne < carTwo) return carTwo - carOne;
      else return carOne - carTwo;
    },
    totalSavings() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      if (carOne < carTwo) return carTwo - carOne;
      else return carOne - carTwo;
    },
    totalSavingsPercent() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      const diff = this.totalSavings;
      return Math.round(carOne > carTwo ? (diff / carOne) * 100 : (diff / carTwo) * 100);
    },
    energySaved() {
      // Currently not displayed anywhere
      return (
        (this.cars[this.getIndexOfLowest(this.totalFuelCosts)].consumption / 100) *
        this.usage.distance
      );
    },
    // Below makes comparisons
    cheapestCar() {
      return this.cars[this.getIndexOfLowest(this.totalOwnershipCosts)];
    },
    cheapestCarToRun() {
      return this.cars[this.getIndexOfLowest(this.totalFuelCosts)];
    },
    mostExpensiveCar() {
      return this.cars[this.getIndexOfHighest(this.totalOwnershipCosts)];
    },
    mostExpensiveCarToRun() {
      return this.cars[this.getIndexOfHighest(this.totalFuelCosts)];
    },
  },
  methods: {
    getIndexOfLowest([carOne, carTwo]) {
      return carOne < carTwo ? 0 : 1;
    },
    getIndexOfHighest([carOne, carTwo]) {
      return carOne > carTwo ? 0 : 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'https://fonts.googleapis.com/css?family=Nunito:800';

.cars-results {
  @include card-style;

  text-align: center;
  grid-area: results;
  font-size: 0.8rem;

  @media screen and (min-width: $size-small-tablet) {
    font-size: 1rem;
  }
}

.highlight {
  font-family: Nunito, sans-serif;
  color: $brand-color1;
  word-wrap: break-word;

  @media screen and (min-width: $size-tablet) {
    font-size: 1.5rem;
  }
}

.disclaimer {
  display: block;
  font-size: 0.6rem;
  max-width: 700px;
  margin: auto;
  margin-top: 1rem;

  @media screen and (min-width: $size-tablet) {
    font-size: 0.7rem;
  }

  a {
    color: $brand-color3;
    display: block;

    &:hover {
      @media screen and (min-width: $size-desktop) {
        text-decoration: underline;
        color: $brand-color2;
      }
    }
  }
}
</style>
