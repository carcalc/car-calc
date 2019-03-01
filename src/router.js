import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Information from './views/Information.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/om',
      name: 'information',
      component: Information,
    },
  ],
  mode: 'history',
});
