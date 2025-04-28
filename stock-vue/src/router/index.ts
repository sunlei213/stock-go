import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      component: () => import('../views/layout/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: 'account',
          name: 'Account',
          component: () => import('../views/user/Account.vue')
        },
        {
          path: 'stocks',
          name: 'Stocks',
          component: () => import('../views/stock/index.vue')
        },
        {
          path: 'stocks/:id',
          name: 'StockDetail',
          component: () => import('../views/stock/Detail.vue')
        },
        {
          path: 'trades',
          name: 'Trades',
          component: () => import('../views/trade/index.vue')
        },
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('../views/order/index.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router 