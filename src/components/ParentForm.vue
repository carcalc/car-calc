<template>
  <div class="parentWrapper">
    <CarsFromDb/>
    <br>
    <br>
    <div class="formWrapper">
      <BaseForm title="Bil 1" v-on:dataToParent="childClicked1"/>

      <BaseForm title="Bil 2" v-on:dataToParent="childClicked2"/>
    </div>
    <br>
    <button @click="compare" class="compareBtn">Jämför</button>
    <br>
    <br>
    <h2>{{output}}</h2>
  </div>
</template>

<script>
import BaseForm from "./BaseForm";
import CarsFromDb from "./CarsFromDb";
export default {
  name: "ParentForm",
  components: {
    BaseForm,
    CarsFromDb
  },
  data() {
    return {
      formDataOne: "",
      formDataTwo: "",
      output: ""
    };
  },
  methods: {
    childClicked1(data) {
      this.formDataOne = data;
    },
    childClicked2(data) {
      this.formDataTwo = data;
    },

    compare() {
      if (this.formDataOne > this.formDataTwo) {
        const result = this.formDataOne - this.formDataTwo;
        this.output = `Bil 1 är' ${result} kr dyrare än bil 2`;
      } else {
        const result = this.formDataTwo - this.formDataOne;
        this.output = `Bil 2 är ${result} kr dyrare än bil 1 första året`;
      }
    }
  }
};
</script>

<style scoped>
.parentWrapper {
  width: 100%;
}
.formWrapper {
  display: flex;
  width: 100%;
  margin: auto;
}
.compareBtn {
  padding: 15px 60px;
  background: rgb(245, 120, 75);
}
</style>
