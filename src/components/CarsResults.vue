<template>
  <section class="cars-results">
    <div v-if="totalSavings < 100">
      <p>Båda bilarna kostar lika mycket. Vad är oddsen liksom?</p>
    </div>
    <div v-else>
      <p>
        <span class="highlight">{{ cheapestCar.name }}</span> är billigast och utgör en
        <span class="highlight"> total besparing på {{ savingsFormatted }} </span>
        (eller {{ percentFormatted }}) jämfört med {{ mostExpensiveCar.name }}.
      </p>

      <p v-if="cheapestCar.type === 'electric'">
        Miljöbilspremien
        {{ cheapestIsBrandNew ? `på ${bonusFormatted} är inräknad och` : 'är ej inräknad, men' }}
        {{ cheapestCar.name }} är ett utmärkt miljöval!
      </p>

      <p v-else-if="cheapestCar.co2 < 90">
        Dessvärre är det inget bra miljöval.
      </p>

      <p>
        {{ cheapestCarToRun.name }}
        {{ cheapestCar === cheapestCarToRun ? 'är också' : 'är dock' }}
        {{ fuelSavingsFormatted }} billigare i drift över {{ usage.ownership }} år och
        {{ distanceFormatted }}.
      </p>
    </div>
    <small class="disclaimer">
      Uträkningen avser bilens inköpspris samt energiförbrukning och tar inte hänsyn till exempelvis
      skatt, värdeminskning och servicekostnader. Dessa är svåra att estimera korrekt och vi har
      därför för närvarande valt att utelämna dem.
      <router-link :to="{ name: 'information' }">Läs mer om hur vi har resonerat.</router-link>
    </small>
  </section>
</template>
<script>
import { TweenLite } from 'gsap/TweenMax';
export default {
  props: {
    usage: { type: Object, required: true },
    cars: { type: Array, required: true },
    calcOptions: { type: Object, required: true },
  },
  data() {
    return {
      tweenedNumbers: {
        savings: 0,
        percent: 0,
        fuelSavings: 0,
        distance: 0,
      },
    };
  },
  mounted() {
    // Sets animation starting points
    this.tweenedNumbers = {
      savings: this.totalSavings,
      percent: this.totalSavingsPercent,
      fuelSavings: this.fuelSavings,
      distance: this.totalDistance,
    };
  },
  methods: {
    formatNo(num) {
      return Math.round(num).toLocaleString('sv-SE');
    },
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
    // Below returns formatted and tweened numbers for DOM output
    savingsFormatted: function() {
      return this.formatNo(this.tweenedNumbers.savings) + ' kr';
    },
    percentFormatted: function() {
      return this.formatNo(this.tweenedNumbers.percent) + '%';
    },
    fuelSavingsFormatted: function() {
      return this.formatNo(this.tweenedNumbers.fuelSavings) + ' kr';
    },
    distanceFormatted: function() {
      return this.formatNo(this.tweenedNumbers.distance / 10) + ' mil';
    },
    bonusFormatted: function() {
      return this.formatNo(this.calcOptions.evBonus) + ' kr';
    },
  },
  watch: {
    // Animates numbers on change
    totalSavings: function(newValue) {
      TweenLite.to(this.$data.tweenedNumbers, 0.5, { savings: newValue });
    },
    totalSavingsPercent: function(newValue) {
      TweenLite.to(this.$data.tweenedNumbers, 0.5, { percent: newValue });
    },
    fuelSavings: function(newValue) {
      TweenLite.to(this.$data.tweenedNumbers, 0.5, { fuel: newValue });
    },
    totalDistance: function(newValue) {
      TweenLite.to(this.$data.tweenedNumbers, 0.5, { distance: newValue });
    },
  },
};
</script>
<style lang="scss" scoped>
.cars-results {
  @include card-style;
  text-align: center;
  grid-area: results;
}
.highlight {
  font-size: 1.5rem;
  font-weight: bold;
  color: $brand-color3;
  word-wrap: break-word;
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
  }
}
</style>
