<template>
  <div id="app">
    <AppHeader />
    <AppNav />
    <transition appear name="bounce">
      <router-view />
    </transition>
    <AppFooter :linkedInAndreas="linkedInAndreas" :linkedInGabriel="linkedInGabriel" />
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import AppNav from '@/components/AppNav';
export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav,
    AppFooter,
  },
  data() {
    return {
      linkedInAndreas: 'http://www.linkedin.com/in/andreas-hansson-',
      linkedInGabriel: 'http://www.linkedin.com/in/gabriellundmark',
    };
  },
};
</script>
<style lang="scss">
#app {
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgb(30, 30, 39) 0%, rgb(48, 48, 59) 100%);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
  justify-content: center;
  padding-top: $navheight; /* Fixed nav offset */
  display: grid;
  grid-template:
    'nav' auto
    'content' 1fr
    'footer' auto;

  @media screen and (min-width: $size-tablet) {
    grid-template:
      'header' auto
      'nav' auto
      'content' 1fr
      'footer' auto
      / minmax(320px, 1100px);
    padding-top: 0;
    padding: 1rem;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.3s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
