<template>
  <div id="app">
    <AppHeader />
    <AppNav />
    <transition appear name="bounce">
      <router-view :contact="contact" />
    </transition>
    <AppFooter :contact="contact" @reset="resetApp" />
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
    // Todo: move this to locale file when i18n is installed
    return {
      contact: {
        email: 'hello@carcalc.se',
        andreas: {
          name: 'Andreas',
          linkedIn: 'http://www.linkedin.com/in/andreas-hansson-',
          email: 'andreas@carcalc.se',
        },
        gabriel: {
          name: 'Gabriel',
          linkedIn: 'http://www.linkedin.com/in/gabriellundmark',
          email: 'gabriel@carcalc.se',
        },
      },
    };
  },
  methods: {
    resetApp() {
      localStorage.clear();
      location.reload();
    },
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
  min-height: 100vh;
  display: grid;
  grid-template:
    'nav' auto
    'content' 1fr
    'footer' auto
    / minmax(320px, 1100px);

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
</style>
