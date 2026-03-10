import type { User } from '../domain/User'
import type { UserRepository } from '../domain/UserRepository'
import type { Pool } from 'pg'

export class UserRepositoryPg implements UserRepository {

    private readonly pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async findAll(): Promise<User[]> {
        const result = await this.pool.query('SELECT * FROM users')

        return result.rows.map(row => ({
        ...row,
        birthdate: new Date(row.birthdate),
        document_issuance_date: new Date(row.document_issuance_date),
        created_at: row.created_at ? new Date(row.created_at) : undefined,
        updated_at: row.updated_at ? new Date(row.updated_at) : undefined
        }))
    }

    async findById(id: number): Promise<User | null> {
        const result = await this.pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
        )

        if (result.rows.length === 0) {
        return null
        }


        const row = result.rows[0]

        return {
        ...row,
        birthdate: new Date(row.birthdate),
        document_issuance_date: new Date(row.document_issuance_date),
        created_at: row.created_at ? new Date(row.created_at) : undefined,
        updated_at: row.updated_at ? new Date(row.updated_at) : undefined
        }
    }
}