//La validación va en el dominio porque es una regla del negocio que debe cumplirse 
// independientemente de la base de datos, el backend o el framework frontend.//

import type { ProductId } from "./Product";

export interface Stock {
    productId: ProductId
    quantity: number
}