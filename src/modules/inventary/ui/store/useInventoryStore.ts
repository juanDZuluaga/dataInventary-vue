import { defineStore } from 'pinia'
import { ref } from 'vue'

import { UpdateStock } from '../../application/UpdateStock'
import { InMemoryStockRepository } from '../../infrastructure/InMemoryStockRepository'
import type { ProductId } from '../../domain/Product'
import type { Stock } from '../../domain/Stock'

export const useInventoryStore = defineStore('inventory', () => {
  const repository = new InMemoryStockRepository()
  const updateStock = new UpdateStock(repository)

  const stocks = ref<Map<ProductId, Stock>>(new Map())
  const error = ref<string | null>(null)

  const loadStock = async (productId: ProductId) => {
    const stock = await repository.findByProductId(productId)
    if (stock) {
      stocks.value.set(productId, stock)
    }
  }

  const changeStock = async (productId: ProductId, amount: number) => {
    try {
      error.value = null
      await updateStock.execute(productId, amount)
      await loadStock(productId)
    } catch (e: any) {
      error.value = e.message
    }
  }

  return {
    stocks,
    error,
    loadStock,
    changeStock,
  }
})