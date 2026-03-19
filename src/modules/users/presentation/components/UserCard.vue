<!--
    🃏 CAPA DE PRESENTACIÓN - Componente: UserCard

    Componente que muestra la información de un usuario en formato tarjeta.
    
    Es un componente "tonto" (dumb/presentational component):
    - Solo RECIBE datos via props
    - Solo EMITE eventos al componente padre
    - No llama al store directamente
    - No tiene lógica de negocio

    Esto lo hace reutilizable y fácil de probar.
-->
<script setup lang="ts">
import type { UserResponseDTO } from '../../application/dtos/UserDTO';

// ── PROPS: Datos que recibe el componente ──────

/**
 * defineProps define qué datos puede recibir este componente.
 * TypeScript garantiza que se pasen correctamente.
 */
const props = defineProps<{
    /** El usuario a mostrar en la tarjeta */
    user: UserResponseDTO;
}>();

// ── EMITS: Eventos que puede emitir ────────────

/**
 * defineEmits define qué eventos puede enviar al padre.
 * Cuando el usuario hace clic en "Ver detalle", emitimos este evento.
 */
const emit = defineEmits<{
    /** Se emite cuando el usuario quiere ver el detalle */
    (event: 'view-detail', userId: number): void;
}>();

// ── HANDLERS ───────────────────────────────────

/** Emite el evento con el ID del usuario al hacer clic */
function handleViewDetail(): void {
    emit('view-detail', props.user.id);
}
</script>

<template>
    <!--
        La tarjeta del usuario.
        Tailwind usa clases utilitarias para el estilo — cada clase hace una cosa específica.
    -->
    <article
        class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg
            transition-shadow duration-300 flex flex-col gap-4"
    >
        <!-- Encabezado: Avatar + Nombre + Estado -->
        <header class="flex items-center gap-4">
            <!-- Avatar generado con las iniciales del usuario -->
            <div
                class="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center
                    text-white font-bold text-xl flex-shrink-0"
                :aria-label="`Avatar de ${user.fullName}`"
            >
                <!-- Tomamos la primera letra del nombre y del apellido -->
                {{ user.firstName[0] }}{{ user.firstSurname[0] }}
            </div>

            <!-- Nombre y estado activo/inactivo -->
            <div class="flex-1 min-w-0">
                <h2 class="text-gray-900 font-semibold text-lg truncate">
                {{ user.fullName }}
                </h2>
                <!-- Badge de estado: verde si activo, gris si inactivo -->
                <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1"
                :class="user.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'"
                >
                <!-- Punto de color indicador -->
                <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="user.isActive ? 'bg-green-500' : 'bg-gray-400'"
                />
                {{ user.isActive ? 'Activo' : 'Inactivo' }}
                </span>
            </div>
        </header>

        <!-- Cuerpo: Información principal -->
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <!-- Usamos dl/dt/dd para información descriptiva (semántica HTML) -->

            <div>
                <dt class="text-gray-400 text-xs uppercase tracking-wide">Documento</dt>
                <dd class="text-gray-700 font-medium">{{ user.typeDocument }} {{ user.numberDocument }}</dd>
            </div>

            <div>
                <dt class="text-gray-400 text-xs uppercase tracking-wide">Edad</dt>
                <dd class="text-gray-700 font-medium">{{ user.age }} años</dd>
            </div>

            <div>
                <dt class="text-gray-400 text-xs uppercase tracking-wide">Ciudad</dt>
                <dd class="text-gray-700 font-medium">{{ user.city }}</dd>
            </div>

            <div>
                <dt class="text-gray-400 text-xs uppercase tracking-wide">Sexo</dt>
                <dd class="text-gray-700 font-medium">{{ user.sexLabel }}</dd>
            </div>
        </dl>

        <!-- Email -->
        <a :href="`mailto:${user.email}`" class="text-indigo-600 text-sm hover:underline truncate">
            {{ user.email }}
        </a>

        <!-- Pie: Botón de acción -->
        <footer class="pt-2 border-t border-gray-100">
            <button
                type="button"
                class="w-full py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700
                    rounded-lg text-sm font-medium transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                @click="handleViewDetail"
            >
                Ver perfil completo →
            </button>
        </footer>
    </article>
</template>