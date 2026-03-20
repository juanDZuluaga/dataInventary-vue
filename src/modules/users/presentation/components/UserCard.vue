<script setup lang="ts">
import type { UserResponseDTO } from '../../application/dtos/UserDTO';

const props = defineProps<{
  user: UserResponseDTO;
}>();

const emit = defineEmits<{
  (event: 'view-detail', userId: number): void;
}>();

function handleViewDetail(): void { emit('view-detail', props.user.id); }
</script>

<template>
  <article class="bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-6 mt-10 hover:shadow-lg hover:border-gray-600 transition-all duration-300 flex flex-col gap-4">
    <div class="flex items-center justify-center m-5" style="margin:-60px 0px 0px 0px;">
        <div class="bg-zinc-900 w-30 h-30 rounded-full flex items-center justify-center">
            <h1>IMG</h1>
        </div>
    </div>
    <!-- Encabezado: Avatar + Nombre + Estado -->
    <header class="flex items-center gap-4">
      <!-- Avatar -->
     
      <div class="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shrink-0" :aria-label="`Avatar de ${user.fullName}`" >
        {{ user.firstName[0] }}{{ user.firstSurname[0] }}
      </div>

      <!-- Nombre y estado -->
      <div class="flex-1 min-w-0">
        <h2 class="text-white font-semibold text-lg truncate">
          {{ user.fullName }}
        </h2>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1" :class="user.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'" >
        <span  class="w-1.5 h-1.5 rounded-full" :class="user.isActive ? 'bg-green-400' : 'bg-gray-500'" /> {{ user.isActive ? 'Activo' : 'Inactivo' }} </span>
      </div>
    </header>

    <!-- Cuerpo: Información -->
    <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
      <div>
        <dt class="text-gray-500 text-xs uppercase tracking-wide">Documento</dt>
        <dd class="text-gray-200 font-medium">{{ user.typeDocument }} {{ user.numberDocument }}</dd>
      </div>
      <div>
        <dt class="text-gray-500 text-xs uppercase tracking-wide">Edad</dt>
        <dd class="text-gray-200 font-medium">{{ user.age }} años</dd>
      </div>
      <div>
        <dt class="text-gray-500 text-xs uppercase tracking-wide">Ciudad</dt>
        <dd class="text-gray-200 font-medium">{{ user.city }}</dd>
      </div>
      <div>
        <dt class="text-gray-500 text-xs uppercase tracking-wide">Sexo</dt>
        <dd class="text-gray-200 font-medium">{{ user.sexLabel }}</dd>
      </div>
    </dl>

    <!-- Email -->
    <a :href="`mailto:${user.email}`" class="text-indigo-400 text-sm hover:text-indigo-300 hover:underline truncate transition-colors">
      {{ user.email }}
    </a>

    <!-- Botón -->
    <footer class="pt-2 border-t border-gray-700">
      <button type="button" class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-gray-800"
        @click="handleViewDetail"
      >
        Ver perfil completo →
      </button>
    </footer>
  </article>
</template>