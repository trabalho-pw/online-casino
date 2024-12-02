import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import GameSelectorView from '../views/GameSelectorView.vue'
import MinesView from '../views/MinesView.vue'

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
      path: '/game_selector',
      name: 'game_selector',
      component: GameSelectorView, 
    },
    {
      path: '/mines',
      name: 'mines',
      component: MinesView
    }
  ],
})

export default router
