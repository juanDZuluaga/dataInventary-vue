import type { Stock } from './Stock'
import type { ProductId } from './Product'

/**
 * Contrato del repositorio de stock.
 *
 * Define las operaciones necesarias para acceder y persistir
 * el stock de productos, independientemente de la tecnología usada.
 */
export interface StockRepository {
  /**
   * Obtiene el stock asociado a un producto.
   *
   * @param productId Identificador único del producto
   * @returns El stock del producto o `null` si no existe
   */
  findByProductId(productId: ProductId): Promise<Stock | null>

  /**
   * Persiste el stock de un producto.
   *
   * Si el stock ya existe, debe actualizarse.
   * Si no existe, debe crearse.
   *
   * @param stock Entidad stock a persistir
   */
  save(stock: Stock): Promise<void>
}