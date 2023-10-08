import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/state=done&:pathMatch(.*)*',
      redirect: to => {
        const urlParams = new URLSearchParams(to.params.pathMatch[0]);
        const access_token = urlParams.get('access_token');
        localStorage.setItem("access_token", access_token);
        return { path: '/' }
      },
    },
  ]
})

export default router

