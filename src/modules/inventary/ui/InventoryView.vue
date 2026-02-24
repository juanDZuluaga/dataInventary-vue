/**
 * Componente de UI para actualizar el stock de un producto.
 *
 * Actúa como capa de presentación y delega la lógica de negocio
 * al caso de uso UpdateStock.
 */
<script setup lang="ts">

import { ref } from 'vue'
import { UpdateStock } from '../application/UpdateStock'
import { InMemoryStockRepository } from '../infrastructure/InMemoryStockRepository'


// Estado de la UI
const productId = ref('product-1')
const quantity = ref<number>(0)
const message = ref('')

// Wiring manual (temporal)
const stockRepository = new InMemoryStockRepository()
const updateStock = new UpdateStock(stockRepository)

/**
 * Obtiene el stock de un producto desde memoria.
 * @param productId Identificador único del producto
 * @returns El stock del producto o `null` si no existe
 */
async function onUpdateStock() {
    try{
        await updateStock.execute(productId.value, quantity.value)
        message.value = 'Stock actualizado correctamente'
    }catch(error){
        message.value = (error as Error).message
    }
}
</script>

<template>
    <div class="p-4 max-w-md mx-auto">
        <h1 class="text-xl font-bold mb-15">
            <strong>
                Actualizar Stock
            </strong>   
        </h1>
        <div class="mb-3">
            <label class="block mb-1 text-blue-500 text-2xl">
                <strong>Identificador del producto</strong>
            </label>
            <input v-model="productId" class="border p-2 w-full rounded-xl"/>
        </div>
        <div class="mb-3">
            <label class="block text-blue-500 text-2xl mb-1">
                <strong>Cantidad</strong>
            </label>
            <input type="number" v-model.number="quantity" class="border p-2 w-full rounded-xl"/>
        </div>
        <button @click="onUpdateStock" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition mt-10">
            Actualizar
        </button>
        <p v-if="message" class="mt-3 text-sm"> {{ message }} </p>
    </div>
</template>