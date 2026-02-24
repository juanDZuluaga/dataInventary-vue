/**
 * Valida que la cantidad de stock cumpla las reglas de negocio.
 *
 * Un producto no puede tener una cantidad de stock negativa.
 *
 * @param quantity Cantidad de stock a validar
 * @throws Error Si la cantidad es menor que cero
 */
export function validateStockQuantity(quantity: number): void {
  if (quantity < 0) {
    throw new Error('Stock cannot be negative')
  }
}