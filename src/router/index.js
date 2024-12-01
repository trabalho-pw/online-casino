import { createRouter, createWebHistory } from 'vue-router'
//import RegisterView from '@/views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import GameSelectorView from '../views/GameSelectorView.vue'
import MinesView from '../views/MinesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
