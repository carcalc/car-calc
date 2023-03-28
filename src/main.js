import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'core-js';

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
