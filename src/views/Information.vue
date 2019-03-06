<template>
  <div class="information">
    <InformationSources />
    <InformationAbout />
  </div>
</template>
<script>
import InformationAbout from '@/components/InformationAbout.vue';
import InformationSources from '@/components/InformationSources.vue';

export default {
  name: 'home',
  components: {
    InformationAbout,
    InformationSources,
  },
};
</script>

<style lang="scss" scoped>
.information {
  max-width: 600px;
  margin: auto;
}
</style>
