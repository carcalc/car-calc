<template>
  <div class="wrapper">
    <div class="form-container">
      <form>
        <h2>Inköpspris SEK</h2>
        <input type="number" v-model.number="car.price">

        <h2>Drivmedel</h2>
        <input type="radio" name="electric" v-model="car.type" value="electric">
        <label for="electric">El</label>
        <input type="radio" name="gasoline" v-model="car.type" value="gasoline">
        <label for="gasoline">Bensin/diesel</label>

        <h2>Körsträcka mil/år</h2>
        <input type="number" v-model.number="car.distance">

        <h2>Förbrukning/mil</h2>
        <input type="number" v-model.number="car.consumtion">

        <br>
        <button
          class="submitBtn"
          v-on:click.prevent="handleSubmit(car.price, car.type, car.distance, car.consumtion)"
        >Submit</button>
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
  data() {
    return {
      car: {
        price: "",
        type: "",
        distance: "",
        consumtion: ""
      },
      tenKmCost: "",
      yearCost: "",
      oneYearCostTotal: ""
    };
  },
  methods: {
    handleSubmit(price, type, distance, consumtion) {
      const gasPrice = 15;
      const electricityPrice = 0.75;
      const premie = 50000;

      if (type === "gasoline") {
        this.tenKmCost = gasPrice * consumtion;
        this.yearCost = distance * consumtion * gasPrice;
        this.oneYearCostTotal = distance * consumtion * gasPrice + price;
        this.$emit("dataToParent", this.oneYearCostTotal);
      } else {
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
