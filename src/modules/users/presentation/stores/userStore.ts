/**
 * 🗄️ CAPA DE PRESENTACIÓN - Store de Pinia: useUserStore
 *
 * El STORE es el puente entre la lógica de aplicación (casos de uso)
 * y los componentes de Vue.
 *
 * Responsabilidades del store:
 * - Guardar el estado de los usuarios en memoria
 * - Invocar los casos de uso cuando sea necesario
 * - Exponer estado reactivo a los componentes
 * - Manejar estados de carga y error
 *
 * El store NO llama directamente a la API ni al repositorio.
 * Solo conoce los casos de uso.
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Importamos los casos de uso y DTOs
import { GetAllUsersUseCase, GetUserByIdUseCase } from '../../application/use-cases/UserUseCases';
import type { UserResponseDTO } from '../../application/dtos/UserDTO';

// Importamos el repositorio (cambia a UserApiRepository cuando se tenga backend)
import { UserMockRepository } from '../../infrastructure/repositories/UserMockRepository';

// ──────────────────────────────────────────────
// COMPOSICIÓN DE DEPENDENCIAS
// Aquí "ensamblamos" las piezas: repositorio → caso de uso
// ──────────────────────────────────────────────

/**
 * Creamos una sola instancia del repositorio.
 * Para usar la API real, cambia esto por:
 * const repository = new UserApiRepository('http://tu-backend.com/api');
 */
const repository = new UserMockRepository();

/** Casos de uso instanciados con el repositorio */
const getAllUsersUseCase = new GetAllUsersUseCase(repository);
const getUserByIdUseCase = new GetUserByIdUseCase(repository);

// ──────────────────────────────────────────────
// DEFINICIÓN DEL STORE
// ──────────────────────────────────────────────

/**
 * Store de usuarios usando la Composition API de Pinia.
 *
 * Usamos la sintaxis "setup store" (con ref/computed) en lugar
 * de la sintaxis de opciones (state/getters/actions) porque es
 * más similar a cómo escribimos composables en Vue 3.
 */
export const useUserStore = defineStore('users', () => {
    // ── ESTADO ──────────────────────────────────
    // ref() crea variables reactivas — cuando cambian, Vue actualiza la UI

    /** Lista de todos los usuarios cargados */
    const users = ref<UserResponseDTO[]>([]);

    /** Usuario seleccionado para ver su detalle */
    const selectedUser = ref<UserResponseDTO | null>(null);

    /** true mientras se están cargando datos */
    const isLoading = ref(false);

    /** Mensaje de error si algo falla, null si todo está bien */
    const error = ref<string | null>(null);

    // ── GETTERS (computed) ──────────────────────
    // computed() son valores derivados del estado, se recalculan automáticamente

    /** ¿Hay usuarios cargados? */
    const hasUsers = computed(() => users.value.length > 0);

    /** Solo los usuarios activos */
    const activeUsers = computed(() =>
        users.value.filter((u) => u.isActive)
    );

    /** Cantidad total de usuarios */
    const totalUsers = computed(() => users.value.length);

  // ── ACCIONES ────────────────────────────────

    /**
   * Carga todos los usuarios invocando el caso de uso correspondiente.
   * Maneja el estado de carga y los errores.
   */
    async function fetchAllUsers(): Promise<void> {
        isLoading.value = true;
        error.value = null;

        try {
            users.value = await getAllUsersUseCase.execute();
        } catch (e) {
        // Capturamos el error y lo guardamos para mostrarlo en la UI
            error.value = e instanceof Error ? e.message : 'Error desconocido al cargar usuarios';
            console.error('[UserStore] Error al cargar usuarios:', e);
        } finally {
            // Siempre desactivamos el loading, haya error o no
            isLoading.value = false;
        }
    }

    /**
     * Carga un usuario específico por su ID.
     * @param id - ID del usuario a cargar
     */
    async function fetchUserById(id: number): Promise<void> {
        isLoading.value = true;
        error.value = null;
        selectedUser.value = null;

        try {
            selectedUser.value = await getUserByIdUseCase.execute(id);
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Error desconocido al cargar el usuario';
            console.error(`[UserStore] Error al cargar usuario ${id}:`, e);
        } finally {
            isLoading.value = false;
        }
    }

    /**
     * Limpia el usuario seleccionado (útil al salir de la vista detalle).
     */
    function clearSelectedUser(): void {
        selectedUser.value = null;
        error.value = null;
    }

    // Exponemos todo lo que los componentes necesitan
    return {
        // Estado
        users,
        selectedUser,
        isLoading,
        error,
        // Getters
        hasUsers,
        activeUsers,
        totalUsers,
        // Acciones
        fetchAllUsers,
        fetchUserById,
        clearSelectedUser,
    };
});