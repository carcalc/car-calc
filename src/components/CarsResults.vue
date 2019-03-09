<template>
  <div class="cars-results">
    <p>
      <span class="highlight">{{ cars[cheapestTotalIndex].name }}</span> är billigast och utgör en
      <span class="highlight"> total besparing på {{ savingsFormatted }} kr </span>
      (eller {{ percentFormatted }}%) jämfört med {{ cars[mostExpensiveIntotalIndex].name }}.
    </p>

    <p v-if="cars[cheapestTotalIndex].type === 'electric'">
      Miljöbilspremien på {{ formatNo(evBonus) }} kr är inräknad och
      {{ cars[cheapestTotalIndex].name }} är ett utmärkt miljöval!
    </p>

    <p v-if="cars[cheapestTotalIndex].co2 < 90">
      Dessvärre är det inget bra miljöval.
    </p>

    <p>
      {{ cars[cheapestToRunIndex].name }}
      {{ cars[cheapestTotalIndex] === cars[cheapestToRunIndex] ? 'är också' : 'är dock' }}
      {{ fuelSavingsFormatted }} kr billigare i drift över {{ usage.ownership }} år och
      {{ distanceFormatted }} mil.
    </p>
  </div>
</template>
<script>
import { TweenLite } from 'gsap/TweenMax';
export default {
  props: ['usage', 'cars', 'evBonus'],
  data() {
    return {
      tweenedSavings: 0,
      tweenedPercent: 0,
      tweenedFuelSavings: 0,
      tweenedDistance: 0,
    };
  },
  mounted() {
    // Sets animation starting points
    this.tweenedSavings = this.totalSavings;
    this.tweenedPercent = this.totalSavingsPercent;
    this.tweenedFuelSavings = this.fuelSavings;
    this.tweenedDistance = this.totalDistance;
  },
  methods: {
    formatNo(num) {
      return Math.round(num).toLocaleString('sv-SE');
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
        return car.type === 'electric' ? cost - this.evBonus : cost;
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
    // Below returns indexes to select corresponding car from array
    cheapestToRunIndex: function() {
      const [carOne, carTwo] = this.totalFuelCosts;
      return carOne < carTwo ? 0 : 1;
    },
    cheapestTotalIndex: function() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      return carOne < carTwo ? 0 : 1;
    },
    mostExpensiveToRunIndex: function() {
      const [carOne, carTwo] = this.totalFuelCosts;
      return carOne > carTwo ? 0 : 1;
    },
    mostExpensiveIntotalIndex: function() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      return carOne > carTwo ? 0 : 1;
    },
    energySaved: function() {
      return (this.mostExpensiveToRun.consumption / 100) * this.usage.distance;
    },
    // Below returns formatted and tweened numbers for DOM output
    savingsFormatted: function() {
      return this.formatNo(this.tweenedSavings);
    },
    percentFormatted: function() {
      return this.formatNo(this.tweenedPercent);
    },
    fuelSavingsFormatted: function() {
      return this.formatNo(this.tweenedFuelSavings);
    },
    distanceFormatted: function() {
      return this.formatNo(this.tweenedDistance / 10);
    },
  },
  watch: {
    // Animates numbers on change
    totalSavings: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedSavings: newValue });
    },
    totalSavingsPercent: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedPercent: newValue });
    },
    fuelSavings: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedFuelSavings: newValue });
    },
    totalDistance: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedDistance: newValue });
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
  color: $main-color;
  word-wrap: break-word;
}
</style>
