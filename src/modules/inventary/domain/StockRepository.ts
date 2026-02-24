import type { Stock } from './Stock'
import type { ProductId } from './Product'

export interface StockRepository {
    findByProductId(productId: ProductId): Promise<Stock | null>
    save(stock: Stock): Promise<void>
}