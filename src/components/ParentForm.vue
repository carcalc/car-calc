<template>
  <div class="wrapper">
    <div>
      <h1>{{ formTitleOne }}</h1>
      <BaseForm v-on:dataToParent="childClicked1"/>
    </div>
    <div>
      <h1>{{ formTitleTwo }}</h1>
      <BaseForm v-on:dataToParent="childClicked2"/>
    </div>
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
      formTitleOne: "Bil 1",
      formTitleTwo: "Bil 2",
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
        this.output = `<h2>'Bil 1 är' ${result} kr dyrare än bil 2</h2>`;
      } else {
        const result = this.formDataTwo - this.formDataOne;
        this.output = `Bil 2 är ${result} kr dyrare än bil 1`;
      }
    }
  }
};
</script>

<style scoped>
/* .wrapper {
  padding: 50px;
}
.wrapper div {
  width: 50%;
  display: flex;
}
.compareBtn {
  padding: 20px 70px;
  background: lightseagreen;
} */
</style>
