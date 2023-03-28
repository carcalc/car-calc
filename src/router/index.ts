import { createRouter, createWebHistory } from 'vue-router';

import CompareCars from '@/views/CompareCars.vue';
import AboutUs from '@/views/AboutUs.vue';
import UserGuide from '@/views/UserGuide.vue';

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
