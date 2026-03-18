/**
 * 📦 CAPA DE APLICACIÓN - DTOs (Data Transfer Objects)
 *
 * Los DTOs son objetos simples que definen la estructura de los datos
 * que entran y salen de los casos de uso.
 *
 * ¿Por qué no usar la entidad directamente?
 * - La entidad tiene lógica de negocio y métodos, los DTOs son datos puros.
 * - Podemos exponer solo lo que necesitamos (por seguridad, por ejemplo
 *   no incluimos el password_hash).
 * - Desacoplamos la capa de aplicación de la presentación.
 */

/**
 * DTO de respuesta para un usuario.
 * Contiene todos los campos que se muestran en la interfaz de usuario.
 * NOTA: No incluye password_hash por seguridad.
 */
export interface UserResponseDTO {
  id:                   number;
  firstName:            string;
  secondName?:          string;
  firstSurname:         string;
  secondSurname?:       string;
  fullName:             string;     // Campo calculado por la entidad
  age:                  number;     // Campo calculado por la entidad
  typeDocument:         string;
  numberDocument:       string;
  documentIssuanceDate: string;     // Fechas como string para la UI
  sex:                  string;
  sexLabel:             string;     // "Masculino" o "Femenio"
  country:              string;
  email:                string;
  cellPhone:            string;
  city:                 string;
  address:              string;
  birthdate:            string;
  isActive:             boolean;
  createdAt:            string;
  updatedAt:            string;
}