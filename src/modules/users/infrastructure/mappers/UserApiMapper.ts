/**
 * 🔧 CAPA DE INFRAESTRUCTURA - Mapeador: API → Dominio
 *
 * Los MAPEADORES transforman los datos del mundo exterior
 * al formato que entiende nuestro dominio (y viceversa).
 *
 * ¿Por qué necesitamos esto?
 * La API devuelve datos en snake_case (como viene de la base de datos),
 * pero nuestro dominio trabaja con camelCase y objetos Date, no strings.
 *
 * El mapeador hace esa "traducción" para que el dominio
 * siempre reciba datos limpios y bien tipados.
 */

import { User } from '../../domain/entities/User';
import type { DocumentType, Sex } from '../../domain/entities/User';

/**
 * Interfaz que representa la respuesta RAW de la API.
 * Los nombres de campo coinciden exactamente con la base de datos (snake_case).
 */
export interface UserApiResponse {
  id: number;
  first_name: string;
  second_name?: string;
  first_surname: string;
  second_surname?: string;
  type_document: string;
  number_document: string;
  document_issuance_date: string;  // La API devuelve fechas como string ISO
  sex: string;
  country: string;
  email: string;
  cell_phone: string;
  city: string;
  address: string;
  birthdate: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // password_hash NO se incluye por seguridad — nunca debe llegar al frontend
}

/**
 * Clase estática con métodos para convertir datos de la API al dominio.
 * Usamos una clase estática para organizar los métodos de mapeo.
 */
export class UserApiMapper {
  /**
   * Convierte la respuesta de la API a una entidad de dominio User.
   *
   * @param raw - Datos crudos de la API (snake_case, fechas como string)
   * @returns Entidad User del dominio (camelCase, fechas como Date)
   */
  static toDomain(raw: UserApiResponse): User {
    return User.create({
      id: raw.id,
      firstName: raw.first_name,
      secondName: raw.second_name,
      firstSurname: raw.first_surname,
      secondSurname: raw.second_surname,
      typeDocument: raw.type_document as DocumentType,
      numberDocument: raw.number_document,
      // Convertimos strings de fecha a objetos Date para que la entidad pueda calcular edad, etc.
      documentIssuanceDate: new Date(raw.document_issuance_date),
      sex: raw.sex as Sex,
      country: raw.country,
      email: raw.email,
      cellPhone: raw.cell_phone,
      city: raw.city,
      address: raw.address,
      birthdate: new Date(raw.birthdate),
      isActive: raw.is_active,
      createdAt: new Date(raw.created_at),
      updatedAt: new Date(raw.updated_at),
    });
  }

  /**
   * Convierte un array de respuestas de la API a entidades de dominio.
   * Simplemente aplica toDomain a cada elemento.
   */
  static toDomainList(rawList: UserApiResponse[]): User[] {
    return rawList.map(UserApiMapper.toDomain);
  }
}