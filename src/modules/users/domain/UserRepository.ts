import  type { User } from "./User";

/**
 * Puerto (Port)
 * Define las operaciones que el dominio necesita
 */

export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User | null>
}