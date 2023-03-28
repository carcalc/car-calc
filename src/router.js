import Vue from 'vue';
import Router from 'vue-router';
import CompareCars from '@/views/CompareCars.vue';
import AboutUs from '@/views/AboutUs.vue';
import UserGuide from '@/views/UserGuide.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'compare',
      component: CompareCars,
    },
    {
      path: '/hjalp',
      name: 'help',
      component: UserGuide,
    },
    {
      path: '/om',
      name: 'about',
      component: AboutUs,
    },
  ],
  mode: 'history',
});
