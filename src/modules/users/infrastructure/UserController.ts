// modules/users/infrastructure/UserController.ts

import type { Request, Response } from 'express'
import { GetUsersUseCase } from '../application/GetUsersUseCase'

/**
 * Controlador HTTP.
 * 
 * Traduce:
 * HTTP → Caso de uso
 */
export class UserController {

    private readonly getUsersUseCase: GetUsersUseCase

    constructor(getUsersUseCase: GetUsersUseCase) {
        this.getUsersUseCase = getUsersUseCase
    }

    /**
     * Endpoint GET /users
     */
    async getUsers(_req: Request, res: Response): Promise<void> {
        try {
            const users = await this.getUsersUseCase.execute()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}