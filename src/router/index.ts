import { createRouter, createWebHistory } from 'vue-router'
import InventoryView from '../modules/inventary/ui/InventoryView.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'inventary',
            component: InventoryView,
        },
    ],
})