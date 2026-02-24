import type { StockRepository } from '../domain/StockRepository'
import { validateStockQuantity } from '../domain/StockRules'
import type { ProductId } from '../domain/Product'
import type { Stock } from '../domain/Stock'

/**
 * Caso de uso encargado de actualizar el stock de un producto.
 *
 * Valida la nueva cantidad y persiste el stock actualizado
 * utilizando el repositorio de stock.
 */
export class UpdateStock {
    private readonly stockRepository: StockRepository

    /**
   * Crea una instancia del caso de uso UpdateStock.
   *
   * @param stockRepository Repositorio encargado de la persistencia del stock
   */
    constructor(stockRepository: StockRepository) {
        this.stockRepository = stockRepository
    }

    /**
     * Ejecuta la actualización del stock para un producto específico.
    *
    * @param productId Identificador único del producto
    * @param newQuantity Nueva cantidad de stock
    *
    * @throws Error Si la cantidad de stock no cumple las reglas de negocio
    */
    async execute(productId: ProductId, newQuantity: number): Promise<void> {
    // Validación de reglas de negocio
        validateStockQuantity(newQuantity)

        const updatedStock: Stock = {
            productId,
            quantity: newQuantity,
        }

        await this.stockRepository.save(updatedStock)
    }
}