<!--
    🖥️ CAPA DE PRESENTACIÓN - Vista Principal: UsersView

    Esta es la vista "inteligente" (smart component).
    Es la única que se comunica con el store.

    Responsabilidades:
    - Inicializar la carga de datos al montarse
    - Controlar qué se muestra: lista o detalle
    - Conectar el store con los componentes hijos (presentacionales)

    Los componentes hijos (UserCard, UserDetail) son "tontos" —
    no saben nada del store, solo reciben props y emiten eventos.
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue';

// Importamos el store (única fuente de verdad para el estado)
import { useUserStore } from '../stores/userStore';

// Importamos los componentes visuales
import UserCard from '../components/UserCard.vue';
import UserDetail from '../components/UserDetail.vue';

// ── STORE ────────────────────────────────────────
/**
 * Conectamos con el store de usuarios.
 * storeToRefs no es necesario aquí porque accedemos via store.xxx
 */
const userStore = useUserStore();

// ── ESTADO LOCAL DE LA VISTA ──────────────────────
/**
 * Este ref controla si mostramos la lista o el detalle.
 * Es estado de UI, no de negocio — por eso vive en la vista, no en el store.
 */
const showDetail = ref(false);

// ── CICLO DE VIDA ─────────────────────────────────
/**
 * onMounted se ejecuta cuando el componente se monta en el DOM.
 * Es el momento ideal para cargar los datos iniciales.
 */
onMounted(async () => {
  // Solo cargamos si no tenemos datos (evitamos llamadas redundantes)
  if (!userStore.hasUsers) {
    await userStore.fetchAllUsers();
  }
});

// ── HANDLERS ─────────────────────────────────────

/**
 * Maneja el evento "ver detalle" de una tarjeta.
 * Carga el usuario por ID y muestra la vista de detalle.
 */
async function handleViewDetail(userId: number): Promise<void> {
    await userStore.fetchUserById(userId);
    showDetail.value = true;
}

/**
 * Vuelve a la lista de usuarios.
 */
function handleGoBack(): void {
  showDetail.value = false;
  userStore.clearSelectedUser();
}
</script>

<template>
    <main class="min-h-screen bg-gray-50 py-10 px-4">
        <div class="max-w-6xl mx-auto">

        <!-- ENCABEZADO de la página -->
        <header class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">
            Gestión de Usuarios
            </h1>
            <p class="text-gray-500 mt-1">
            {{ userStore.totalUsers }} usuario registrado
            — {{ userStore.activeUsers.length }} activo
            </p>
        </header>

        <!-- ── ESTADO: Cargando ── -->
        <div
            v-if="userStore.isLoading"
            class="flex flex-col items-center justify-center py-20 gap-4"
            role="status"
            aria-live="polite"
        >
            <!-- Spinner animado con CSS puro -->
            <div
            class="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600
                    rounded-full animate-spin"
            />
            <p class="text-gray-500 text-sm">Cargando usuarios...</p>
        </div>

        <!-- ── ESTADO: Error ── -->
        <div
            v-else-if="userStore.error"
            class="bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
            role="alert"
        >
            <p class="text-red-700 font-medium">⚠️ Ocurrió un error</p>
            <p class="text-red-500 text-sm mt-1">{{ userStore.error }}</p>
            <button
            type="button"
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm
                    hover:bg-red-700 transition-colors"
            @click="userStore.fetchAllUsers()"
            >
            Reintentar
            </button>
        </div>

        <!-- ── ESTADO: Sin datos ── -->
        <div
            v-else-if="!userStore.hasUsers && !userStore.isLoading"
            class="text-center py-20 text-gray-400"
        >
            <p class="text-lg">No hay usuarios registrados.</p>
        </div>

        <!-- ── CONTENIDO PRINCIPAL ── -->
        <template v-else>

            <!-- Vista DETALLE: se muestra cuando el usuario hace clic en "Ver perfil" -->
            <UserDetail
            v-if="showDetail && userStore.selectedUser"
            :user="userStore.selectedUser"
            @go-back="handleGoBack"
            />

            <!-- Vista LISTA: grid de tarjetas de usuarios -->
            <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
            <!--
                v-for: Renderizamos una tarjeta por cada usuario.
                :key es obligatorio en v-for — ayuda a Vue a identificar cada elemento.
            -->
            <UserCard
                v-for="user in userStore.users"
                :key="user.id"
                :user="user"
                @view-detail="handleViewDetail"
            />
            </div>

        </template>

        </div>
    </main>
</template>