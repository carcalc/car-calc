<template>
  <div>
    <form class="formWrapper">
      <h1>CarsFromDb</h1>
      <select v-model="selectedCar" @change="selected">
        <option
          v-for="car in cars"
          :key="car.id"
          :value="car"
          :selected="selectedCar === car"
        >{{car.name}}</option>
      </select>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "CarsFromDb",
  data() {
    return {
      cars: [],
      selectedCar: {
        price: null,
        electricConsumption: null,
        gasConsumption: null
      }
    };
  },
  created() {
    // fetch data from firestore
    db.collection("cars")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let car = doc.data();
          car.id = doc.id;
          this.cars.push(car);
        });
      });
  },
  methods: {
    selected(e) {
      this.$root.$emit("selected", this.selectedCar);
      // this.price = this.selectedCar.price;
      // this.electricConsumption = this.selectedCar.electricConsumption;
      // this.gasConsumption = this.selectedCar.gasConsumption;
    }
  }
};
</script>

<style scoped>
.formWrapper {
  width: 40%;
  border: 1px solid #333;
  padding: 20px;
  margin: auto;
}
</style>
