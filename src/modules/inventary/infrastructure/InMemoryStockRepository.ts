import type { StockRepository } from '../domain/StockRepository'
import type { Stock } from '../domain/Stock'
import type { ProductId } from '../domain/Product'

/**
 * Implementación en memoria del repositorio de stock.
 * Esta clase está pensada para:
 * - Pruebas
 * - Desarrollo local
 * - Prototipos
 * Los datos se pierden al reiniciar la aplicación.
 */
export class InMemoryStockRepository implements StockRepository {
  private stocks: Map<ProductId, Stock> = new Map()

  /**
   * Obtiene el stock de un producto desde memoria.
   * @param productId Identificador único del producto
   * @returns El stock del producto o `null` si no existe
   */
  async findByProductId(productId: ProductId): Promise<Stock | null> {
    return this.stocks.get(productId) ?? null
  }

  /**
   * Guarda o actualiza el stock de un producto en memoria.
   * Si el producto ya existe, su stock será reemplazado.
   * @param stock Entidad stock a persistir
   */
  async save(stock: Stock): Promise<void> {
    this.stocks.set(stock.productId, stock)
  }
}