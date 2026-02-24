import type { StockRepository } from '../domain/StockRepository'
import { validateStockQuantity } from '../domain/StockRules'
import type { ProductId } from '../domain/Product'
import type { Stock } from '../domain/Stock'

export class UpdateStock {
    private readonly stockRepository: StockRepository

    constructor(stockRepository: StockRepository) {
        this.stockRepository = stockRepository
    }

    async execute(productId: ProductId, newQuantity: number): Promise<void> {
    validateStockQuantity(newQuantity)

    // const stock = await this.stockRepository.findByProductId(productId)

    const updatedStock: Stock = {
        productId,
        quantity: newQuantity,
    }

    await this.stockRepository.save(updatedStock)
    }
}