export function validateStockQuantity(quantity: number): void {
    if (quantity < 0) {
        throw new Error('Stock cannot be negative')
    }
}