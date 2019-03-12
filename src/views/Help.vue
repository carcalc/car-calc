<template>
  <div class="help">
    <HelpText />
  </div>
</template>
<script>
import HelpText from '@/components/HelpText.vue';

export default {
  name: 'help',
  components: {
    HelpText,
  },
};
</script>

<style lang="scss">
.help {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;

  h2,
  p {
    margin-bottom: 1rem;
  }

  .help-text {
    color: $white;
  }
}
</style>
