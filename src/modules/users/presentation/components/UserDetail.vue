<!--
    📋 CAPA DE PRESENTACIÓN - Componente: UserDetail

    Muestra todos los datos de un usuario en formato de perfil completo.
    
    También es un componente presentacional (dumb):
    - Recibe el usuario completo via prop
    - Emite evento para volver atrás
    - Sin lógica de negocio
-->
<script setup lang="ts">
import type { UserResponseDTO } from '../../application/dtos/UserDTO';

const props = defineProps<{
  /** Usuario a mostrar en detalle */
    user: UserResponseDTO;
}>();

const emit = defineEmits<{
    /** Se emite cuando el usuario quiere volver a la lista */
    (event: 'go-back'): void;
}>();
</script>

<template>
    <section class="bg-zinc-900 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        <!-- Encabezado -->
        <header class="bg-linear-to-r from-indigo-600 to-indigo-500 px-6 md:px-8 py-8 md:py-10 text-white">
            <button
                type="button"
                class="mb-6 flex items-center gap-2 text-indigo-200 hover:text-white text-sm transition-colors"
                @click="emit('go-back')"
            >
                ← Volver a los Usuarios
            </button>
            <div class="flex items-center justify-center m-5">
                <div class="bg-zinc-900 w-30 h-30 rounded-full flex items-center justify-center">
                    <h1>IMG</h1>
                </div>
            </div>
            <!-- Avatar + Info -->
            <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4">

                <!-- Círculo Avatar -->
                <div class="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                    {{ user.firstName[0] }}{{ user.firstSurname[0] }}
                </div>

                <!-- Nombre, email y badge -->
                <div class="text-center sm:text-left">
                    <h1 class="text-xl md:text-2xl font-bold">{{ user.fullName }}</h1>
                    <p class="text-indigo-200 text-sm mt-1 break-all">{{ user.email }}</p>
                    <span
                        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mt-2"
                        :class="user.isActive ? 'bg-green-400/20 text-green-200' : 'bg-gray-400/20 text-gray-300'"
                    >
                        <span class="w-1.5 h-1.5 rounded-full" :class="user.isActive ? 'bg-green-300' : 'bg-gray-400'"/>
                        {{ user.isActive ? 'Usuario Activo' : 'Usuario Inactivo' }}
                    </span>
                </div>
            </div>
        </header>

        <!-- Cuerpo -->
        <div class="p-6 md:p-8 space-y-8">

            <!-- Información Personal -->
            <section>
                <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Información Personal
                </h2>
                <hr class="mb-4 border-gray-700">
                <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Primer nombre</dt>
                        <dd class="text-gray-200 font-medium">{{ user.firstName }}</dd>
                    </div>
                    <div v-if="user.secondName" class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Segundo nombre</dt>
                        <dd class="text-gray-200 font-medium">{{ user.secondName }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Primer apellido</dt>
                        <dd class="text-gray-200 font-medium">{{ user.firstSurname }}</dd>
                    </div>
                    <div v-if="user.secondSurname" class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Segundo apellido</dt>
                        <dd class="text-gray-200 font-medium">{{ user.secondSurname }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Fecha de nacimiento</dt>
                        <dd class="text-gray-200 font-medium">{{ user.birthdate }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Edad</dt>
                        <dd class="text-gray-200 font-medium">{{ user.age }} años</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Sexo</dt>
                        <dd class="text-gray-200 font-medium">{{ user.sexLabel }}</dd>
                    </div>
                </dl>
            </section>

            <!-- Documento de Identidad -->
            <section>
                <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Documento de Identidad
                </h2>
                <hr class="mb-4 border-gray-700">
                <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Tipo de documento</dt>
                        <dd class="text-gray-200 font-medium">{{ user.typeDocument }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Número de documento</dt>
                        <dd class="text-gray-200 font-medium">{{ user.numberDocument }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Fecha de expedición</dt>
                        <dd class="text-gray-200 font-medium">{{ user.documentIssuanceDate }}</dd>
                    </div>
                </dl>
            </section>

            <!-- Contacto y Ubicación -->
            <section>
                <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Contacto y Ubicación
                </h2>
                <hr class="mb-4 border-gray-700">
                <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Email</dt>
                        <dd class="text-gray-200 font-medium break-all">{{ user.email }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Celular</dt>
                        <dd class="text-gray-200 font-medium">{{ user.cellPhone }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">País</dt>
                        <dd class="text-gray-200 font-medium">{{ user.country }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Ciudad</dt>
                        <dd class="text-gray-200 font-medium">{{ user.city }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4 sm:col-span-2">
                        <dt class="text-xs text-gray-400 mb-1">Dirección</dt>
                        <dd class="text-gray-200 font-medium">{{ user.address }}</dd>
                    </div>
                </dl>
            </section>

            <!-- Registro en el Sistema -->
            <section>
                <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Registro en el Sistema
                </h2>
                <hr class="mb-4 border-gray-700">
                <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Creado el</dt>
                        <dd class="text-gray-200 font-medium">{{ user.createdAt }}</dd>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <dt class="text-xs text-gray-400 mb-1">Última actualización</dt>
                        <dd class="text-gray-200 font-medium">{{ user.updatedAt }}</dd>
                    </div>
                </dl>
            </section>

        </div>
    </section>
</template>