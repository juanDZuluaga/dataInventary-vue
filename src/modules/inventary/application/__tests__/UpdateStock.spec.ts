import { describe, it, expect, beforeEach } from 'vitest'

import { UpdateStock } from '../UpdateStock'
import { InMemoryStockRepository } from '../../infrastructure/InMemoryStockRepository'
import { Stock } from '../../domain/Stock'
import type { ProductId } from '../../domain/Product'

describe('UpdateStock use case', () => {
  let repository: InMemoryStockRepository
  let updateStock: UpdateStock
  const productId: ProductId = 'product-1'

  beforeEach(async () => {
    repository = new InMemoryStockRepository()
    updateStock = new UpdateStock(repository)

    await repository.save(new Stock(productId, 10))
  })

  it('increments stock correctly', async () => {
    await updateStock.execute(productId, 5)

    const stock = await repository.findByProductId(productId)

    expect(stock).not.toBeNull()
    expect(stock?.quantity).toBe(15)
  })

  it('throws error when stock goes negative', async () => {
    await expect(
      updateStock.execute(productId, -20)
    ).rejects.toThrow()
  })
})