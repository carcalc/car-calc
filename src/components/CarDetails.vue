<template>
  <div class="car-specs-wrapper">
    <div class="cars-selector">
      <h1>Välj bil</h1>
      <select v-model="selected" @change="selectCar">
        <option disabled value>Välj en bil</option>
        <option v-for="car in allCars" :key="car.id" :value="car.name">{{ car.name }}</option>
        <!-- :value shouldn't be an object; we need to change this but I don't know how yet -->
      </select>
    </div>
    <h1>{{ currentCar.name }}</h1>

    <form @submit.prevent="handleSubmit">
      <h2>Inköpspris SEK</h2>
      <input type="number" v-model.number="currentCar.price">
      <h2>Drivmedel</h2>
      <input type="radio" name="electric" v-model="currentCar.type" value="electric">
      <label for="electric">El</label>
      <input type="radio" name="hybrid" v-model="currentCar.type" value="hybrid">
      <label for="hybrid">Laddhybrid</label>
      <input type="radio" name="gasoline" v-model="currentCar.type" value="gasoline">
      <label for="gasoline">Bensin/diesel</label>

      <h2>Förbrukning</h2>
      <input type="number" step="any" v-model.number="currentCar.consumption">
    </form>
    <!-- <div>
      <h2>Kostnader drivmedel</h2>
      <h4 v-if="tenKmCost">Milkostnad: {{ tenKmCost }} kr</h4>
      <h4 v-if="yearCost">Årskostnad {{ yearCost }} kr</h4>
      <h2>Totalkostnad</h2>
      <h4 v-if="oneYearCostTotal">Totalkostnad första året: {{ oneYearCostTotal }} kr</h4>
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'CarDetails',
  props: ['currentCar', 'allCars'],
  data() {
    return { selected: '' };
  },
  methods: {
    selectCar() {
      this.$emit('selected', { name: this.selected, index: this.$vnode.key - 1 });
    },
    // Move all user behavior data to UsageForm, savings data to CostComparison
    // handleSubmit(price, type, electricityPrice, gasPrice, distance, consumption) {
    //   if (electricityPrice === '') {
    //     electricityPrice = 7.5;
    //   } else {
    //     electricityPrice = electricityPrice;
    //   }
    //   if (gasPrice === '') {
    //     gasPrice = 14.8;
    //   } else {
    //     gasPrice = gasPrice;
    //   }
    //   if (distance === '') {
    //     distance = 2000;
    //   } else {
    //     distance = distance;
    //   }

    //   const premieElectric = 40000;
    //   const premieHybrid = 20000;

    //   if (type === 'gasoline') {
    //     this.tenKmCost = gasPrice * consumption;
    //     this.yearCost = distance * consumption * gasPrice;
    //     this.oneYearCostTotal = distance * consumption * gasPrice + price;
    //     this.$emit('dataToParent', this.oneYearCostTotal);
    //   } else if (type === 'electric') {
    //     this.tenKmCost = (electricityPrice / 10) * consumption;
    //     this.yearCost = distance * consumption * (electricityPrice / 10);
    //     this.oneYearCostTotal =
    //       distance * consumption * (electricityPrice / 10) + price - premieElectric;
    //     this.$emit('dataToParent', this.oneYearCostTotal);
    //   }
    // },
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
.car-specs-wrapper {
  padding: 50px;
  margin: auto;
  border: 1px solid #333;
  width: 30em;
}
.submit-btn {
  width: 50%;
  padding: 10px 40px;
  margin: 10px auto;
}
</style>
