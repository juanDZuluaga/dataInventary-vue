import type { ProductId } from './Product'
import type { Stock } from './Stock'

export interface StockRepository {
  findByProductId(productId: ProductId): Promise<Stock | null>
  save(stock: Stock): Promise<void>
}  