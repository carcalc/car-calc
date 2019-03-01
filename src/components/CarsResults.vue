<template>
  <div class="cars-results">
    <template v-for="(car, index) in cars">
      <p :key="index">
        Totalkostnad för
        <span class="highlight">{{ car.name }}</span> är
        <span class="highlight"> {{ formatCost(totalOwnershipCosts[index]) }} kr </span>
        varav {{ totalFuelCosts[index] }} kr i driftkostnad ({{
          (fuelCosts[index] * 10).toFixed(1).replace('.', ',')
        }}
        kr per mil)
        <span v-if="car.type === 'electric'"> och miljöbilspremie på {{ evBonus }} kr</span>
      </p>
    </template>

    <p>
      <span class="highlight">{{ cheapestCar }}</span> är billigast och utgör en
      <span class="highlight">
        besparing på
        {{ formatCost(totalSavings) }} kr
      </span>
      och
      <span>{{ totalSavingsPercent }}%</span> över {{ usage.ownership }} år och
      {{ totalDistance }} km jämfört med {{ mostExpensiveCar }}.

      <!-- Data we can add: -->
      <!-- Display total fuel costs and bonus separately -->
      <!-- Car X is % cheaper to run-->
    </p>
  </div>
</template>
<script>
export default {
  props: ['usage', 'cars', 'evBonus'],
  methods: {
    formatCost(num) {
      return Math.round(num).toLocaleString();
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
      return (this.usage.distance * this.usage.ownership) / 10;
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
    cheapestCar: function() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      return carOne < carTwo ? this.cars[0].name : this.cars[1].name;
    },
    mostExpensiveCar: function() {
      const [carOne, carTwo] = this.totalOwnershipCosts;
      return carOne > carTwo ? this.cars[0].name : this.cars[1].name;
    },
  },
};
</script>
<style lang="scss" scoped>
.cars-results {
  grid-area: results;
  padding: var(--card-padding);
  background-color: var(--white);
  box-shadow: var(--card-shadow);
  border: var(--card-border);
  border-radius: var(--card-radius);
}
.highlight {
  font-size: 1.5rem;
  color: #333;
}
</style>
