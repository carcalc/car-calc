import Vue from 'vue';
import Router from 'vue-router';
import Compare from '@/views/Compare';
import About from '@/views/About';
import Help from '@/views/Help';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'compare',
      component: Compare,
    },
    {
      path: '/hjalp',
      name: 'help',
      component: Help,
    },
    {
      path: '/om',
      name: 'about',
      component: About,
    },
  ],
  mode: 'history',
});
