/**
 * 🔧 CAPA DE INFRAESTRUCTURA - Repositorio Mock (Datos de Prueba)
 *
 * Este repositorio implementa el puerto UserRepository usando datos
 * hardcodeados (fijos en el código). Es ideal para:
 * - Desarrollo sin backend disponible
 * - Pruebas unitarias
 * - Demos y prototipado
 *
 * Cuando el backend esté listo, simplemente creamos un UserApiRepository
 * y lo intercambiamos por este — el resto del código NO cambia.
 * Eso es la magia de la arquitectura hexagonal. 🪄
 */
                                                    
import type { UserRepository } from '../../domain/ports/UserRepository';
import type { User } from '../../domain/entities/User';
import { UserApiMapper } from '../mappers/UserApiMapper';
import type { UserApiResponse } from '../mappers/UserApiMapper';

/**
 * Datos de prueba — simulan lo que devolvería la base de datos.
 * Formato snake_case igual que el API real.
 */
const MOCK_USERS: UserApiResponse[] = [
    {
        id: 4,
        first_name: 'Juan',
        second_name: 'David',
        first_surname: 'Zuluaga',
        second_surname: 'Gutierrez',
        type_document: 'CC',
        number_document: '123456789',
        document_issuance_date: '2015-06-10',
        sex: 'M',
        country: 'Colombia',
        email: 'juanzuluaga@example.com',
        cell_phone: '3001234567',
        city: 'Medellin',
        address: 'Calle 10 #20-30',
        birthdate: '1990-03-15',
        is_active: true,
        created_at: '2026-03-11T07:21:54.529587',
        updated_at: '2026-03-11T07:21:54.529587',
    },
];

/**
 * Implementación del repositorio usando datos en memoria.
 *
 * Implementa la interfaz UserRepository del dominio,
 * por eso el dominio y los casos de uso pueden usarlo
 * sin saber que son datos falsos.
 */
export class UserMockRepository implements UserRepository {
  /**
   * Devuelve todos los usuarios mock.
   * Simula una llamada asíncrona con un pequeño delay (como una API real).
   */
  async getAll(): Promise<User[]> {
    // Simulamos latencia de red (300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Convertimos los datos mock a entidades de dominio usando el mapeador
    return UserApiMapper.toDomainList(MOCK_USERS);
  }

  /**
   * Busca un usuario por ID entre los datos mock.
   * @param id - ID del usuario a buscar
   * @returns La entidad User o null si no existe
   */
  async getById(id: number): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const raw = MOCK_USERS.find((u) => u.id === id);
    if (!raw) return null;

    return UserApiMapper.toDomain(raw);
  }
}