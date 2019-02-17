<template>
  <div class="wrapper">
    <div class="form-container">
      <h1>{{ title }}</h1>
      <form
        @submit.prevent="handleSubmit(car.price, car.type, car.electricityPrice, car.gasPrice, car.distance, car.consumtion)"
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
        <input type="number" v-model.number="car.electricityPrice" placeholder="75">
        <br>
        <label for="gasPrice">Bensin-/dieselpris kr/liter</label>
        <input type="number" v-model.number="car.gasPrice" placeholder="14.80">

        <h2>Körsträcka mil/år</h2>
        <input type="number" v-model.number="car.distance">

        <h2>Förbrukning/mil</h2>
        <input type="number" v-model.number="car.consumtion">

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
  </div>
</template>

<script>
export default {
  name: "BaseForm",
  props: ["title"],
  data() {
    return {
      car: {
        price: "",
        type: "",
        electricityPrice: "",
        gasPrice: "",
        distance: "",
        consumtion: ""
      },
      tenKmCost: "",
      yearCost: "",
      oneYearCostTotal: ""
    };
  },
  methods: {
    handleSubmit(
      price,
      type,
      electricityPrice,
      gasPrice,
      distance,
      consumtion
    ) {
      if (electricityPrice === "") {
        electricityPrice = 7.5;
      } else {
        electricityPrice = electricityPrice / 10;
      }
      if (gasPrice === "") {
        gasPrice = 14.8;
      } else {
        gasPrice = gasPrice;
      }

      const premieElectric = 40000;
      const premieHybrid = 20000;
      console.log(gasPrice);
      console.log(electricityPrice);

      if (type === "gasoline") {
        this.tenKmCost = gasPrice * consumtion;
        this.yearCost = distance * consumtion * gasPrice;
        this.oneYearCostTotal = distance * consumtion * gasPrice + price;
        this.$emit("dataToParent", this.oneYearCostTotal);
      } else if (type === "electric") {
        this.tenKmCost = electricityPrice * consumtion;
        this.yearCost = distance * consumtion * electricityPrice;
        this.oneYearCostTotal =
          distance * consumtion * gasPrice + price - premie;
        this.$emit("dataToParent", this.oneYearCostTotal);
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  padding: 50px;
  border: 1px solid #333;
  width: 30em;
}
.form-container {
  width: 100%;
}
.submitBtn {
  width: 50%;
  padding: 10px 40px;
  margin: 10px auto;
}
</style>
