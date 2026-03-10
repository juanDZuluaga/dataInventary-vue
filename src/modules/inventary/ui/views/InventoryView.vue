<script setup lang="ts">
import { onMounted } from 'vue'
import { useInventoryStore } from '../store/useInventoryStore'

const store = useInventoryStore()
const productId = 'product-1'

onMounted(async () => {
  await store.changeStock(productId, 10) // inicializamos
})
</script>

<template>
  <div>
    <h2>Inventory</h2>

    <p v-if="store.stocks.get(productId)">
      Stock actual:
      {{ store.stocks.get(productId)?.quantity }}
    </p>

    <button @click="store.changeStock(productId, 1)">
      +1
    </button>

    <button @click="store.changeStock(productId, -1)">
      -1
    </button>

    <p v-if="store.error" style="color: red;">
      {{ store.error }}
    </p>
  </div>
</template>