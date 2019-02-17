<template>
  <div class="wrapper">
    <BaseForm title="Bil 1" v-on:dataToParent="childClicked1"/>

    <BaseForm title="Bil 2" v-on:dataToParent="childClicked2"/>

    <button @click="compare" class="compareBtn">Jämför</button>
    <br>
    <br>
    <h2>{{output}}</h2>
  </div>
</template>

<script>
import BaseForm from "./BaseForm";
export default {
  name: "ParentForm",
  components: {
    BaseForm
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
        this.output = `Bil 2 är ${result} kr dyrare än bil 1`;
      }
    }
  }
};
</script>

<style scoped>
</style>
