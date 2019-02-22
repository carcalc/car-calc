<template>
  <div class="car-wrapper">
    <div class="cars-selector">
      <h1>Välj bil</h1>
      <select v-model="selected" @change="handleChange">
        <option disabled value>Välj en bil</option>
        <option v-for="car in allCars" :key="car.id" :value="car.name">{{ car.name }}</option>
      </select>
    </div>
    <h1>{{ currentCar.name }}</h1>

    <form @submit.prevent class="car-details">
      <h2>Inköpspris (kr)</h2>
      <input type="number" v-model.number="currentCar.price" />
      <h2>Drivmedel</h2>
      <input type="radio" name="electric" v-model="currentCar.type" value="electric" />
      <label for="electric">El</label>
      <input type="radio" name="hybrid" v-model="currentCar.type" value="hybrid" />
      <label for="hybrid">Laddhybrid</label>
      <input type="radio" name="gasoline" v-model="currentCar.type" value="gasoline" />
      <label for="gasoline">Bensin/diesel</label>

      <h2>Förbrukning {{ fuelUnit }}</h2>
      <input type="number" step="any" v-model.number="currentCar.consumption" />
    </form>
    <h2>Kostnader</h2>
    <p>Bränslekostnad: {{ fuelCosts }} (kr/mil)</p>
    <p>Totalkostnad: {{ totalCosts }} kr (över {{ usageDetails.ownership }} år)</p>
  </div>
</template>

<script>
export default {
  name: 'CarDetails',
  props: ['currentCar', 'allCars', 'usageDetails'],
  data() {
    return { selected: this.currentCar.name };
  },
  computed: {
    fuelUnit() {
      return this.currentCar.type === 'electric' ? '(kWh/100 km)' : '(liter/100 km)';
    },
    fuelCosts() {
      return Math.round(
        this.currentCar.type === 'electric'
          ? (this.usageDetails.kwhPrice * this.currentCar.consumption) / 10
          : (this.usageDetails.gasPrice * this.currentCar.consumption) / 10
      );
    },
    totalCosts() {
      return (
        this.currentCar.price +
        this.fuelCosts * this.usageDetails.distance * this.usageDetails.ownership
      );
    },
  },
  methods: {
    handleChange() {
      this.$emit('selected', { name: this.selected, index: this.$vnode.key - 1 });
    },
  },
};
</script>

<style lang="scss" scoped>
.cars-selector {
  width: 40%;
  border: 1px solid #333;
  padding: 20px;
  margin: auto;
}
.car-wrapper {
  padding: 50px;
  margin: auto;
  border: 1px solid #333;
  width: 30em;
}
.car-details {
}
</style>
