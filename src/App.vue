<template>
  <div id="app">
    <AppHeader />
    <AppNav />
    <router-view />
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
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(42, 42, 42, 1) 100%);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
  min-height: 100vh;
  display: grid;
  justify-content: center;
  grid-template:
    'header' 120px
    'nav' auto
    'content' 1fr
    'footer' auto
    / minmax(320px, 1100px);

  @media screen and (min-width: $size-tablet) {
    padding: 1rem;
  }
}
</style>
