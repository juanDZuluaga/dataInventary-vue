// modules/users/infrastructure/database.ts

import { Pool } from 'pg'

/**
 * Pool de conexiones a PostgreSQL.
 * 
 * Infraestructura pura.
 * El dominio NO sabe que esto existe.
 */
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})