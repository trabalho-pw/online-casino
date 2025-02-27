import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase';

import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import GameSelectorView from '../views/GameSelectorView.vue'
import MinesView from '../views/MinesView.vue'
import BlackjackView from '@/views/BlackjackView.vue';
import CacaNiquelView from '@/views/CacaNiquelView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/:userID',
      name: 'home',
      component: GameSelectorView,
      // meta: { requiresAuth: true },
    },
    {
      path: '/game_selector',
      name: 'game_selector',
      component: GameSelectorView, 
    },
    {
      path: '/mines/:userID',
      name: 'mines',
      component: MinesView,
    },
    {
      path: '/blackjack/:userID',
      name: 'blackjack',
      component: BlackjackView,
    },
    {
      path: '/caca-niquel/:userID',
      name: 'caca-niquel',
      component: CacaNiquelView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
    next('/game_selector');
  } else {
    next();
  }
});

export default router
