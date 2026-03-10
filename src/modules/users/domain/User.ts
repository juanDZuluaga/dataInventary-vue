/**
 * Entidad principal del dominio User
 * Representa la estructura del usuario en el sistema
 */
export interface User {
    id: number
    first_name:               string
    second_name?:             string
    first_surname:            string
    second_surname?:          string
    type_document:            string
    number_document:          string
    document_issuance_date:   Date
    sex:                      string
    country:                  string
    email:                    string
    cell_phone:               string
    city:                     string
    address:                  string
    birthdate:                Date
    is_active?:               boolean
    created_at?:              Date
    updated_at?:              Date
    }
