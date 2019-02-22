<template>
  <div class="car-wrapper">
    <div class="cars-selector">
      <h1>Välj bil</h1>
      <select v-model="selected" @change="handleChange">
        <option disabled value>Välj en bil</option>
        <option v-for="car in allCars" :key="car.id" :value="car">
          {{ car.name }}
        </option>
      </select>
    </div>
    <h1>{{ selected.name }}</h1>

    <form @submit.prevent class="car-details">
      <h2>Inköpspris</h2>
      <input type="number" min="0" v-model.number="selected.price" />
      <span>(kr)</span>
      <h2>Drivmedel</h2>
      <input type="radio" name="electric" v-model="selected.type" value="electric" />
      <label for="electric">El</label>
      <input type="radio" name="hybrid" v-model="selected.type" value="hybrid" />
      <label for="hybrid">Laddhybrid</label>
      <input type="radio" name="gasoline" v-model="selected.type" value="gasoline" />
      <label for="gasoline">Bensin/diesel</label>

      <h2>Förbrukning</h2>
      <input type="number" step="any" min="0" v-model.number="selected.consumption" />
      <span>{{ fuelUnit }}</span>
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
    return { selected: '' };
  },
  computed: {
    fuelUnit() {
      return this.selected.type === 'electric' ? '(kWh/100 km)' : '(liter/100 km)';
    },
    fuelCosts() {
      return Math.round(
        this.selected.type === 'electric'
          ? (this.usageDetails.kwhPrice * this.selected.consumption) / 10
          : (this.usageDetails.gasPrice * this.selected.consumption) / 10
      );
    },
    totalCosts() {
      return (
        this.selected.price +
        this.fuelCosts * this.usageDetails.distance * this.usageDetails.ownership
      );
    },
  },
  methods: {
    handleChange() {
      this.$emit('selected', { car: this.selected, index: this.$vnode.key - 1 });
    },
  },
  created() {
    this.selected = this.currentCar; //set default car on load
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
