<template>
  <div id="app">
    <AppHeader/>
    <AppNav/>
    <router-view/>
    <AppFooter/>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import AppNav from "@/components/AppNav";
export default {
  name: "App",
  components: {
    AppHeader,
    AppNav,
    AppFooter
  }
};
</script>
<style>
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
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
body,
html {
  min-height: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
