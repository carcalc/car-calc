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
  background: linear-gradient(0deg, rgb(30, 30, 39) 0%, rgb(48, 48, 59) 100%);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
  min-height: 100vh;
  justify-content: center;
  margin-top: $navheight; /* Fixed nav offset */

  @media screen and (min-width: $size-tablet) {
    display: grid;
    grid-template:
      'header' auto
      'nav' auto
      'content' 1fr
      'footer' auto
      / minmax(320px, 1100px);
    margin-top: 0;
    padding: 1rem;
  }
}
</style>
