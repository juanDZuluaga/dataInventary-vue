// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { UsersView } from '@/modules/users'; // ← Importa desde el index

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/usuarios',
      name: 'users',
      component: UsersView,
    },
  ],
});