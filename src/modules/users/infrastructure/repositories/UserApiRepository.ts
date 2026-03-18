/**
 * 🔧 CAPA DE INFRAESTRUCTURA - Repositorio HTTP (API Real)
 *
 * Este repositorio implementa el puerto UserRepository haciendo
 * llamadas HTTP reales a un backend.
 *
 * Cuando el backend esté listo, cambia UserMockRepository
 * por este en el archivo de composición (index.ts).
 * El resto del código — casos de uso, stores, componentes — no cambia. ✨
 */

import type { UserRepository } from '../../domain/ports/UserRepository';
import type { User } from '../../domain/entities/User';
import { UserApiMapper } from '../mappers/UserApiMapper';
import type { UserApiResponse } from '../mappers/UserApiMapper';

/**
 * Repositorio que obtiene usuarios desde una API REST.
 * Recibe la URL base como dependencia para ser flexible.
 */
export class UserApiRepository implements UserRepository {
    /**
     * @param baseUrl - URL base de tu API, ej: "http://localhost:8000/api"
     */
    constructor(private readonly baseUrl: string) {}

    /**
     * GET /users — Obtiene todos los usuarios
     */
    async getAll(): Promise<User[]> {
        const response = await fetch(`${this.baseUrl}/users`);

        if (!response.ok) {
            throw new Error(`Error al obtener usuarios: ${response.statusText}`);
        }

        const data: UserApiResponse[] = await response.json();
        return UserApiMapper.toDomainList(data);
    }

    /**
     * GET /users/:id — Obtiene un usuario por ID
     */
    async getById(id: number): Promise<User | null> {
        const response = await fetch(`${this.baseUrl}/users/${id}`);

        // 404 significa que no existe, no es un error del sistema
        if (response.status === 404) return null;

        if (!response.ok) {
            throw new Error(`Error al obtener usuario ${id}: ${response.statusText}`);
        }

        const data: UserApiResponse = await response.json();
        return UserApiMapper.toDomain(data);
    }
}