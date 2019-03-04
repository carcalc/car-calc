<template>
  <div class="cars-results card">
    <!-- Remove this?  -->
    <!-- <template v-for="(car, index) in cars">
      <p :key="index">
        Totalkostnad för
        <span class="highlight">{{ car.name }}</span> är
        <span class="highlight"> {{ formatNo(totalOwnershipCosts[index]) }} kr </span>
        varav {{ formatNo(totalFuelCosts[index]) }} kr i driftkostnad ({{
          (fuelCosts[index] * 10).toFixed(1).replace('.', ',')
        }}
        kr per mil)
        <span v-if="car.type === 'electric'"> och miljöbilspremie på {{ evBonus }} kr</span>
      </p>
    </template> -->

    <p>
      <span class="highlight">{{ cheapestInTotal.name }}</span> är billigast och utgör en
      <span class="highlight">
        total besparing på
        {{ formatNo(totalSavings) }} kr
      </span>
      (eller {{ totalSavingsPercent }}%) jämfört med {{ mostExpensiveIntotal.name }}.
      <span v-if="cheapestInTotal.type === 'electric'">
        Miljöbilspremien på {{ formatNo(evBonus) }} kr är inräknad.
      </span>
    </p>
    <p>
      {{ cheapestToRun.name }} {{ cheapestInTotal === cheapestToRun ? 'är också' : 'är dock' }}
      {{ formatNo(fuelSavings) }} kr billigare i drift över {{ usage.ownership }} år och
      {{ formatNo(totalDistance / 10) }} mil.
    </p>
  </div>
</template>
<script>
export default {
  props: ['usage', 'cars', 'evBonus'],
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
    cheapestToRun: function() {
      const [carOne, carTwo] = this.totalFuelCosts;
      return carOne < carTwo ? this.cars[0] : this.cars[1];
    },
    cheapestInTotal: function() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      return carOne < carTwo ? this.cars[0] : this.cars[1];
    },
    mostExpensiveToRun: function() {
      const [carOne, carTwo] = this.totalFuelCosts;
      return carOne > carTwo ? this.cars[0] : this.cars[1];
    },
    mostExpensiveIntotal: function() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      return carOne > carTwo ? this.cars[0] : this.cars[1];
    },
    energySaved: function() {
      return (this.mostExpensiveToRun.consumption / 100) * this.usage.distance;
    },
  },
};
</script>
<style lang="scss" scoped>
.cars-results {
  text-align: center;
  grid-area: results;
  padding: var(--card-padding);
  background-color: var(--card-bg);
  box-shadow: var(--card-shadow);
  border: var(--card-border);
  border-radius: var(--card-radius);
}
.highlight {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--highlight-color);
}
</style>
