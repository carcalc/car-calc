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
    padding: 0.5rem 1.5rem 0.5rem 0.5rem;
    border-radius: 15px 0 0 15px;
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 80, 0.3);
  }
  .active {
    right: 0;
    z-index: 11;
    p {
      z-index: 15;
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
.green,
.yellow,
.orange,
.red {
  display: inline-block;
  margin: 3px;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  z-index: 5;
}
.green {
  background: rgb(42, 192, 92);
}
.yellow {
  background: rgb(255, 241, 40);
}
.orange {
  background: rgb(255, 174, 0);
}
.red {
  background: rgb(248, 54, 20);
}
</style>
