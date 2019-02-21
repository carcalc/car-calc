<template>
  <div class="form-container">
    <h1 v-if="selectedCarTitle">{{ selectedCarTitle }}</h1>
    <h1 v-else>{{ title }}</h1>

    <form
      @submit.prevent="
        handleSubmit(
          car.price,
          car.type,
          car.electricityPrice,
          car.gasPrice,
          car.distance,
          car.consumption
        )
      "
    >
      <h2>Inköpspris SEK</h2>
      <input type="number" v-model.number="car.price">

      <h2>Drivmedel</h2>
      <input type="radio" name="electric" v-model="car.type" value="electric">
      <label for="electric">El</label>
      <input type="radio" name="hybrid" v-model="car.type" value="hybrid">
      <label for="hybrid">Laddhybrid</label>
      <input type="radio" name="gasoline" v-model="car.type" value="gasoline">
      <label for="gasoline">Bensin/diesel</label>
      <br>
      <label for="electricityPrice">Elkostnad öre/kWh</label>
      <input type="number" step="any" v-model.number="car.electricityPrice" placeholder="75">
      <br>
      <label for="gasPrice">Bensin-/dieselpris kr/liter</label>
      <input type="number" step="any" v-model.number="car.gasPrice" placeholder="14.80">

      <h2>Körsträcka mil/år</h2>
      <input type="number" v-model.number="car.distance" placeholder="2000">

      <h2>Förbrukning/mil</h2>
      <input type="number" step="any" v-model.number="car.consumption">

      <br>
      <input class="submitBtn" type="submit">
    </form>
    <div>
      <br>
      <h2>Kostnader drivmedel</h2>
      <h4 v-if="tenKmCost">Milkostnad: {{ tenKmCost }} kr</h4>
      <h4 v-if="yearCost">Årskostnad {{ yearCost }} kr</h4>
      <br>
      <h2>Totalkostand</h2>
      <h4 v-if="oneYearCostTotal">Totalkostnad första året: {{ oneYearCostTotal }} kr</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarSpecificationsForm',
  props: ['title'],
  data() {
    return {
      car: {
        price: '',
        type: '',
        electricityPrice: '',
        gasPrice: '',
        distance: '',
        consumption: '',
      },
      selectedCarTitle: '',
      tenKmCost: '',
      yearCost: '',
      oneYearCostTotal: '',
    };
  },

  // computed: {
  //   tenKmCost: function() {
  //     return gasPrice * consumption;
  //   },
  //   yearCost: function() {
  //     return gasPrice * consumption;
  //   }
  // },
  methods: {
    handleSubmit(price, type, electricityPrice, gasPrice, distance, consumption) {
      if (electricityPrice === '') {
        electricityPrice = 7.5;
      } else {
        electricityPrice = electricityPrice;
      }
      if (gasPrice === '') {
        gasPrice = 14.8;
      } else {
        gasPrice = gasPrice;
      }
      if (distance === '') {
        distance = 2000;
      } else {
        distance = distance;
      }

      const premieElectric = 40000;
      const premieHybrid = 20000;

      if (type === 'gasoline') {
        this.tenKmCost = gasPrice * consumption;
        this.yearCost = distance * consumption * gasPrice;
        this.oneYearCostTotal = distance * consumption * gasPrice + price;
        this.$emit('dataToParent', this.oneYearCostTotal);
      } else if (type === 'electric') {
        this.tenKmCost = (electricityPrice / 10) * consumption;
        this.yearCost = distance * consumption * (electricityPrice / 10);
        this.oneYearCostTotal =
          distance * consumption * (electricityPrice / 10) + price - premieElectric;
        this.$emit('dataToParent', this.oneYearCostTotal);
      }
    },
  },
  mounted() {
    this.$root.$on('selected', selectedCar => {
      this.selectedCarTitle = selectedCar.name;
      this.car.price = selectedCar.price;
    });
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  padding: 50px;
  margin: auto;
  border: 1px solid #333;
  width: 30em;
}
.submitBtn {
  width: 50%;
  padding: 10px 40px;
  margin: 10px auto;
}
</style>
