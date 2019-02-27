<template>
  <div class="car-details-wrapper">
    <h1>
      {{ car.name }}
    </h1>
    <h4 v-if="!this.car.id.includes('generic')">
      {{ car.specs }}
    </h4>

    <form @submit.prevent class="car-details">
      <h2>
        Inköpspris
      </h2>
      <input type="number" min="0" v-model.number="car.price" />
      <span>(kr)</span>
      <h2>
        Drivmedel
      </h2>
      <input type="radio" name="electric" v-model="car.type" value="electric" />
      <label for="electric">El</label>
      <input type="radio" name="hybrid" v-model="car.type" value="hybrid" />
      <label for="hybrid">Laddhybrid</label>
      <input type="radio" name="gasoline" v-model="car.type" value="gasoline" />
      <label for="gasoline">Bensin/diesel</label>

      <h2>
        Förbrukning
      </h2>
      <input type="number" step="any" min="0" v-model.number="car.consumption" />
      <span>{{ fuelUnit }}</span>
    </form>
    <h2>
      Kostnader
    </h2>
    <p>
      Bränslekostnad:
      {{ fuelCosts }}
      kr per mil
    </p>
    <p>
      Totalkostnad:
      {{ totalCosts }}
      kr på
      {{ usageDetails.ownership }}
      år
    </p>
  </div>
</template>

<script>
export default {
  name: 'CarDetails',
  props: ['car', 'usageDetails'],
  computed: {
    fuelUnit() {
      return this.car.type === 'electric' ? '(kWh/100 km)' : '(liter/100 km)';
    },
    fuelCosts() {
      return Math.round(
        this.car.type === 'electric'
          ? (this.usageDetails.kwhPrice * this.car.consumption) / 10
          : (this.usageDetails.gasPrice * this.car.consumption) / 10,
      );
    },
    totalCosts() {
      return (
        this.car.price + this.fuelCosts * this.usageDetails.distance * this.usageDetails.ownership
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.car-details-wrapper {
  padding: 3rem;
  margin: auto;
}
</style>
