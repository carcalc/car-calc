import Vue from 'vue';
import Router from 'vue-router';
import Compare from './views/Compare.vue';
import Information from './views/Information.vue';
import Help from './views/Help.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'compare',
      component: Compare,
    },
    {
      path: '/help',
      name: 'help',
      component: Help,
    },
    {
      path: '/om',
      name: 'information',
      component: Information,
    },
  ],
  mode: 'history',
});
