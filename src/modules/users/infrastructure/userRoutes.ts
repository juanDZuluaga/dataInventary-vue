// modules/users/infrastructure/userRoutes.ts

import { Router } from 'express'
import { UserController } from './UserController'

/**
 * Define las rutas HTTP del módulo users.
 */
export function createUserRoutes(controller: UserController) {
    const router = Router()
    router.get('/', (req, res) => controller.getUsers(req, res))
    return router
}