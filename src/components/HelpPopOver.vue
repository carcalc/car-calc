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
<style lang="scss">
.help-popover {
  display: none;
  @media screen and (min-width: $size-tablet) {
    // Hide popover on small screens
    display: initial;
  }
  p {
    margin: 0.5rem;
  }
  button {
    width: 10rem;
    height: 1.5rem;
    background: $brand-color2;
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
    padding-right: 1.5rem;
    border-radius: 15px 0 0 15px;
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 80, 0.3);
    z-index: 11;
    &.active {
      right: 0;
    }
  }
  .help-text {
    padding: 1rem;
    color: $black;
    h2 {
      display: none;
    }
  }
}
</style>
