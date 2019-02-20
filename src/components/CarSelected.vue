<template>
  <form class="formWrapper">
    <h1>CarSelected</h1>
    <select v-model="selectedCar" @change="selected">
      <option
        v-for="car in cars"
        :key="car.id"
        :value="car"
        :selected="selectedCar === car"
      >{{car.name}}</option>
    </select>
  </form>
</template>

<script>
export default {
  name: "CarSelected",
  data() {
    return {
      selectedCar: {
        price: null,
        electricConsumption: null,
        gasConsumption: null
      }
    };
  },
  props: ["cars"],

  methods: {
    selected(e) {
      this.$root.$emit("selected", this.selectedCar);
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
