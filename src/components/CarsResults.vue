<template>
  <section class="cars-results">
    <transition-group name="fade">
      <div key="animation-1" v-if="totalSavings < 100">
        <p class="highlight">Båda bilarna kostar lika mycket.</p>
        <p>Vad är oddsen liksom?</p>
      </div>
      <div key="animation-2" v-else>
        <p>
          <span class="highlight">{{ cheapestCar.name }}</span> är billigast och utgör en
          <span class="highlight">
            total besparing på
            <BaseAnimatedNumber :value="totalSavings" />
            kr
          </span>
          (eller
          <BaseAnimatedNumber :value="totalSavingsPercent" />
          %) jämfört med {{ mostExpensiveCar.name }}.
        </p>

        <p v-if="cheapestCar.type === 'electric' && cheapestIsBrandNew">
          Miljöbilspremien på
          <BaseAnimatedNumber :value="calcOptions.evBonus" />
          kr är inräknad och {{ cheapestCar.name }} är ett utmärkt miljöval!
        </p>

        <p v-else-if="cheapestCar.type === 'electric' && !cheapestIsBrandNew">
          Miljöbilspremien är inte inräknad, men {{ cheapestCar.name }}
          är ändå ett utmärkt miljöval!
        </p>

        <p v-else-if="cheapestCar.co2 < 90">
          Dessvärre är det inget bra miljöval.
        </p>

        <p>
          <span class="highlight"> {{ cheapestCarToRun.name }}</span>
          {{ cheapestCar === cheapestCarToRun ? 'är också' : 'är dock' }}
          <span class="highlight">
            <BaseAnimatedNumber :value="fuelSavings" /> kr billigare i drift
          </span>
          över
          <BaseAnimatedNumber :value="usage.ownership" />
          år och
          <BaseAnimatedNumber :value="totalDistance / 10" />
          mil
        </p>
      </div>

      <small key="animation-3" class="disclaimer">
        Uträkningen avser bilens inköpspris samt energiförbrukning och tar inte hänsyn till
        exempelvis skatt, värdeminskning och servicekostnader. Dessa är svåra att estimera korrekt
        och vi har därför för närvarande valt att utelämna dem.
        <router-link :to="{ name: 'information' }">Läs mer om hur vi har resonerat.</router-link>
      </small>
    </transition-group>
  </section>
</template>

<script>
export default {
  name: 'CarsResults',
  props: {
    usage: { type: Object, required: true },
    cars: { type: Array, required: true },
    calcOptions: { type: Object, required: true },
  },
  methods: {
    getIndexOfLowest(arr) {
      const [carOne, carTwo] = arr;
      return carOne < carTwo ? 0 : 1;
    },
    getIndexOfHighest(arr) {
      const [carOne, carTwo] = arr;
      return carOne > carTwo ? 0 : 1;
    },
  },
  computed: {
    fuelCosts: function() {
      const { gasPrice, kwhPrice } = this.usage;
      return this.cars.map(car => {
        const cost =
          car.type === 'electric'
            ? (car.consumption * kwhPrice) / 100
            : (car.consumption * gasPrice) / 100;
        return cost;
      });
    },
    totalFuelCosts: function() {
      const { distance, ownership } = this.usage;
      return this.cars.map((car, index) =>
        Math.round(this.fuelCosts[index] * distance * ownership),
      );
    },
    totalOwnershipCosts: function() {
      return this.cars.map((car, index) => {
        const cost = this.totalFuelCosts[index] + car.price;
        return car.type === 'electric' && this.calcOptions.isNewCar[index]
          ? cost - this.calcOptions.evBonus
          : cost;
      });
    },
    totalDistance: function() {
      return this.usage.distance * this.usage.ownership;
    },
    fuelSavings: function() {
      const [carOne, carTwo] = this.totalFuelCosts;
      if (carOne < carTwo) return carTwo - carOne;
      else return carOne - carTwo;
    },
    totalSavings: function() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      if (carOne < carTwo) return carTwo - carOne;
      else return carOne - carTwo;
    },
    totalSavingsPercent: function() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      const diff = this.totalSavings;
      return Math.round(carOne > carTwo ? (diff / carOne) * 100 : (diff / carTwo) * 100);
    },
    energySaved: function() {
      // Currently not displayed anywhere
      return (
        (this.cars[this.getIndexOfLowest(this.totalFuelCosts)].consumption / 100) *
        this.usage.distance
      );
    },
    // Below makes comparisons
    cheapestCar: function() {
      return this.cars[this.getIndexOfLowest(this.totalOwnershipCosts)];
    },
    cheapestCarToRun: function() {
      return this.cars[this.getIndexOfLowest(this.totalFuelCosts)];
    },
    mostExpensiveCar: function() {
      return this.cars[this.getIndexOfHighest(this.totalOwnershipCosts)];
    },
    mostExpensiveCarToRun: function() {
      return this.cars[this.getIndexOfHighest(this.totalFuelCosts)];
    },
    cheapestIsBrandNew: function() {
      return this.calcOptions.isNewCar[this.getIndexOfLowest(this.totalOwnershipCosts)];
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito:800');
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
  font-family: 'Nunito', sans-serif;
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
.fade-enter {
  opacity: 0;
  &-active {
    transition: opacity 0.3s;
  }
}
</style>
