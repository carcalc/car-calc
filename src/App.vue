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
@import url('https://fonts.googleapis.com/css?family=Fredoka+One');

/* Site-wide styling goes here */
/* Variables */
:root {
  --black: #2c3e50;
  --accent-color: rgb(1, 133, 115);
  --main-color: rgb(131, 228, 172);
  --headline-color: var(--accent-color);
  --light-grey: rgb(240, 240, 240);
  --white: white;
  --card-gap: 1rem;
  --card-padding: 1.5rem;
  --stats-gap: 1rem;
  // --card-shadow: 2px 2px 12px 3px rgba(0, 0, 80, 0.15);
  --card-shadow: none;
  --card-border: 4px dotted var(--light-grey);
  --card-radius: 15px;
}

/* Reset */
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

fieldset {
  border: 0;
  padding: 0;
  margin: 0;
}

/* Site-wide card styling */
.card-title {
  text-align: center;
}
.card-subtitle {
  text-align: center;
}

.stat-block {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;

  .block-title {
    flex: 1;
    font-size: 1rem;
    font-weight: bold;
    display: block;
  }
  .big-number {
    flex: 1;
    font-weight: bold;
    font-size: 2rem;
    @media screen and (min-width: 650px) {
      font-size: 3rem;
    }
  }

  .block-desc {
    font-size: 0.8rem;
    font-weight: bold;
  }

  input {
    color: var(--black);
    background-color: var(--light-grey);
    border-radius: var(--card-radius);
    padding: 1rem;
    margin: 0;
    border: none;
    font-style: italic;

    &:focus {
      caret-color: var(--main-color);
      box-shadow: 0 0 0 3px var(--main-color);
    }
    &[type='number'] {
      width: 100%;
    }
    &[type='radio'] {
      float: right;
    }
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--black);
  min-height: 100vh;
  min-width: 320px;
}
</style>
