<template>
  <div id="app">
    <AppHeader />
    <AppNav />

    <router-view v-slot="{ Component }">
      <transition appear name="bounce">
        <component :is="Component" />
      </transition>
    </router-view>

    <AppFooter @reset="resetApp" />
  </div>
</template>

<script lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppNav from '@/components/AppNav.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav,
    AppFooter,
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
  background: rgb(0 0 0);
  background: linear-gradient(0deg, rgb(30 30 39) 0%, rgb(48 48 59) 100%);
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
    padding: 1rem;
    padding-top: 0;
  }
}
</style>
