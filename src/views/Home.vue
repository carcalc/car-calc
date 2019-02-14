<template>
  <div class="home">
    <ParentForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import ParentForm from "@/components/ParentForm.vue";

export default {
  name: "home",
  components: {
    ParentForm
  }
};
</script>
<style scoped>
</style>

