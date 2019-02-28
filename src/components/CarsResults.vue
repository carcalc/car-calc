<template>
  <div class="cost-comparison">
    <template v-for="(car, index) in cars">
      <p :key="index">
        Totalkostnad för
        <span class="highlight">{{ car.name }}</span> är
        <span class="highlight">
          {{ Math.round(totalOwnershipCosts[index]).toLocaleString() }} kr
        </span>
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
        besparing på {{ Math.round(totalSavings).toLocaleString() }} kr och
        {{ totalSavingsPercent }}%</span
      >
      över {{ usage.ownership }} år och {{ totalDistance.toLocaleString() }} km jämfört med
      {{ mostExpensiveCar }}.
    </p>
  </div>
</template>
<script>
export default {
  props: ['usage', 'cars', 'evBonus'],
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
.cost-comparison {
  grid-column: 1 / -1;
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 80, 0.15);
  transition: all 300ms;
  max-width: 80%;
  margin: 2rem auto;
  padding: 2rem;
  h1 {
    color: orangered;
  }
}
.highlight {
  font-size: 1.5rem;
  color: #333;
}
</style>
