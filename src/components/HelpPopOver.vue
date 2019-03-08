<template>
  <div class="help-popover">
    <button @click="showMessage" :class="[show ? 'btn-active' : '']">Hjälp</button>
    <div :class="[show ? 'message active' : 'message']">
      <HelpText />
    </div>
  </div>
</template>

<script>
import HelpText from '@/components/HelpText.vue';
export default {
  components: { HelpText },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showMessage() {
      return (this.show = !this.show);
    },
  },
};
</script>
<style lang="scss" scoped>
.help-popover {
  button {
    width: 10rem;
    height: 1.5rem;
    background: $accent-color;
    z-index: 15;
    border: none;
    border-radius: 10px 10px 0 0;
    transform: rotate(-90deg);
    transform-origin: bottom right;
    position: fixed;
    right: 0;
    top: 0;
    font-size: 1rem;
  }
  .btn-active {
    opacity: 0.5;
  }
  .message {
    width: 25rem;
    background: $card-bg;
    color: $black;
    position: fixed;
    top: 25px;
    right: -30rem;
    transition: all 300ms;
    padding: 0.5rem 1.5rem 0.5rem 0.5rem;
    border-radius: 15px 0 0 15px;
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 80, 0.3);
    padding: 1rem;
  }
  .active {
    right: 0;
    z-index: 10;
    p {
      z-index: 15;
    }
  }
  .help-message {
    color: $black;
  }
}
</style>
