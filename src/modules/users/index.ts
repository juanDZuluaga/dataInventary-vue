/**
 * PUNTO DE ENTRADA DEL MÓDULO: users/index.ts
 *
 * Este archivo actúa como la "puerta de entrada" al módulo de usuarios.
 * Define qué es público (exportado) y qué es privado (interno al módulo).
 *
 * ¿Por qué este archivo?
 * - Centraliza todas las exportaciones del módulo
 * - El resto de la app solo importa desde aquí, nunca de archivos internos
 * - Si cambiamos la estructura interna, solo actualizamos este archivo
 *
 * Ejemplo de uso en otros módulos:
 *   import { UsersView, useUserStore } from '@/modules/users'
 *    Correcto — importa desde el punto de entrada
 *
 *   import { useUserStore } from '@/modules/users/presentation/stores/userStore'
 *    Incorrecto — rompe el encapsulamiento del módulo
 */

// Exportamos la vista principal (lo que se usa en el router de Vue)
export { default as UsersView } from './presentation/view/UsersView.vue';

// Exportamos el store (útil si otros módulos necesitan acceder a los usuarios)
export { useUserStore } from './presentation/stores/userStore';

// Exportamos el tipo DTO (para usar en otros módulos si necesitan tipar usuarios)
export type { UserResponseDTO } from './application/dtos/UserDTO';