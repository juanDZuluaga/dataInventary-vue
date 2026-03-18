/**
 * 🎯 CAPA DE APLICACIÓN - Casos de Uso
 *
 * Los CASOS DE USO orquestan el flujo de la aplicación.
 * Son los "directores de orquesta": saben QUÉ hay que hacer,
 * pero delegan el CÓMO a los puertos (repositorios).
 *
 * Cada caso de uso representa UNA acción del usuario o del sistema:
 * - "Quiero ver todos los usuarios"
 * - "Quiero ver el detalle de un usuario"
 *
 * Los casos de uso:
 * ✅ Usan los puertos del dominio (no implementaciones concretas)
 * ✅ Convierten entidades a DTOs para la capa de presentación
 * ✅ Son fáciles de probar (unit tests)
 * ✅ No conocen Vue, Pinia, ni la API
 */

import type { UserRepository } from '../../domain/ports/UserRepositiry';
import type { UserResponseDTO } from '../dtos/UserDTO';

// ──────────────────────────────────────────────
// MAPEADOR PRIVADO: Entidad → DTO
// ──────────────────────────────────────────────

/**
 * Convierte una entidad User en un DTO para la presentación.
 * Formatea las fechas y expone los campos calculados.
 *
 * @param user - Entidad del dominio
 * @returns DTO listo para usar en la UI
 */
import type { User } from '../../domain/entities/User';

function toDTO(user: User): UserResponseDTO {
  // Formateador de fechas: convierte Date a string legible "DD/MM/YYYY"
  const formatDate = (date: Date): string => date.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', });

  return {
    id:                     user.id,
    firstName:              user.firstName,
    secondName:             user.secondName,
    firstSurname:           user.firstSurname,
    secondSurname:          user.secondSurname,
    fullName:               user.fullName,           // Propiedad calculada de la entidad
    age:                    user.age,                     // Propiedad calculada de la entidad
    typeDocument:           user.typeDocument,
    numberDocument:         user.numberDocument,
    documentIssuanceDate:   formatDate(user.documentIssuanceDate),
    sex:                    user.sex,
    sexLabel:               user.sexLabel,           // Propiedad calculada de la entidad
    country:                user.country,
    email:                  user.email,
    cellPhone:              user.cellPhone,
    city:                   user.city,
    address:                user.address,
    birthdate:              formatDate(user.birthdate),
    isActive:               user.isActive,
    createdAt:              formatDate(user.createdAt),
    updatedAt:              formatDate(user.updatedAt),
  };
}

// ──────────────────────────────────────────────
// CASO DE USO 1: Obtener todos los usuarios
// ──────────────────────────────────────────────

/**
 * Caso de uso: GetAllUsersUseCase
 *
 * Responsabilidad: Obtener la lista completa de usuarios
 * y devolverla como DTOs para la presentación.
 */
export class GetAllUsersUseCase {
  /**
   * Inyectamos el repositorio por constructor.
   * Esto se llama "Inyección de Dependencias" (DI).
   *
   * La clase no sabe si el repositorio llama a una API real
   * o devuelve datos mock — no le importa, solo le importa el contrato.
   */
    constructor(private readonly userRepository: UserRepository) {}

  /**
   * Ejecuta el caso de uso.
   * @returns Array de usuarios como DTOs
   */
  async execute(): Promise<UserResponseDTO[]> {
    // 1. Pedimos los usuarios al repositorio (dominio no sabe cómo)
    const users = await this.userRepository.getAll();

    // 2. Convertimos cada entidad a DTO (para la UI)
    return users.map(toDTO);
  }
}

// ──────────────────────────────────────────────
// CASO DE USO 2: Obtener un usuario por ID
// ──────────────────────────────────────────────

/**
 * Caso de uso: GetUserByIdUseCase
 *
 * Responsabilidad: Buscar un usuario específico por su ID.
 * Lanza un error si el usuario no existe (regla de negocio).
 */
export class GetUserByIdUseCase {
  
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Ejecuta el caso de uso.
   * @param id - ID del usuario a buscar
   * @returns El usuario como DTO, o lanza error si no existe
   */
  async execute(id: number): Promise<UserResponseDTO> {
    // 1. Buscamos el usuario
    const user = await this.userRepository.getById(id);

    // 2. Regla de negocio: si no existe, es un error
    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    // 3. Convertimos a DTO y retornamos
    return toDTO(user);
  }
}