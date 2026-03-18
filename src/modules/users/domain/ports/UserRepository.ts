/**
 * 🔌 CAPA DE DOMINIO - Puerto: UserRepository
 *
 * En la arquitectura hexagonal, los PUERTOS son interfaces (contratos)
 * que definen CÓMO el dominio quiere comunicarse con el mundo exterior.
 *
 * El dominio NO sabe si los datos vienen de una API REST, GraphQL,
 * una base de datos, o incluso datos falsos (mock). Solo sabe que
 * alguien le va a proveer los datos siguiendo este contrato.
 *
 * 📦 Puerto de SALIDA (Driven Port):
 * El dominio "llama" hacia afuera para obtener o guardar datos.
 */

import type { User } from '../entities/User';

/**
 * Interfaz que define las operaciones disponibles sobre usuarios.
 *
 * Cualquier clase que implemente esta interfaz puede ser usada
 * como fuente de datos, sin cambiar nada del dominio.
 *
 * Ejemplos de implementaciones posibles:
 * - UserApiRepository → Llama a una API REST
 * - UserMockRepository → Devuelve datos de prueba
 * - UserLocalStorageRepository → Guarda en el navegador
 */
export interface UserRepository {
  /**
   * Obtiene todos los usuarios disponibles.
   * @returns Promesa que resuelve con un array de entidades User
   */
  getAll(): Promise<User[]>;

  /**
   * Busca un usuario específico por su ID.
   * @param id - Identificador único del usuario
   * @returns Promesa que resuelve con el User encontrado, o null si no existe
   */
  getById(id: number): Promise<User | null>;
}