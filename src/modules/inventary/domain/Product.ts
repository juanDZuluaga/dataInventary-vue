//no conoce Vue porque el dominio no depende de frameworks ni de la UI.
// El dominio representa reglas del negocio que deben existir aunque Vue no exista.

export type  ProductId = string

export interface Product {
    id: ProductId
    name: string
    categoryId: string
}