import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' 

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/users' },
    {
        path: '/users',
        component: () => import('@/modules/users/presentation/view/UsersView.vue'),
    }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})