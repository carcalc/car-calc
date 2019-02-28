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
<style>
/* Site-wide styling goes here */
:root {
  --accent-color: rgb(42, 42, 97);
  --main-color: rgb(95, 95, 197);
  --headline-color: var(--accent-color);
  --card-padding: 2rem;
  --card-shadow: 2px 2px 12px 0 rgba(0, 0, 80, 0.15);
  --card-radius: 5px;
}

html {
  box-sizing: border-box;
  font-size: 16px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
  line-height: 1.5;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

fieldset {
  border-radius: 0.5rem;
  border-color: var(--main-color);
  margin: 0;
}
legend {
  color: var(--main-color);
  font-weight: bold;
}
input {
  margin: 0 0.5rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
</style>
