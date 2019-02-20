<template>
  <div class="home">
    <CarsCompare/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarsCompare from "@/components/CarsCompare.vue";

export default {
  name: "home",
  components: {
    CarsCompare
  }
};
</script>
<style scoped>
</style>

