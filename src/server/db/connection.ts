import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from 'env'
import * as schema from 'schema'

function createDb() {
	const databaseUrl = env.DATABASE_URL
	if (!databaseUrl) {
		throw new Error(
			'DATABASE_URL is not set. Add it to your environment before using the database.'
		)
	}

	const client = postgres(databaseUrl, { prepare: false })
	return drizzle(client, { schema })
}

type Db = ReturnType<typeof createDb>

let dbInstance: Db | undefined

function getDb(): Db {
	if (!dbInstance) {
		dbInstance = createDb()
	}
	return dbInstance
}

export const db = new Proxy({} as Db, {
	get(_target, property, receiver) {
		const value = Reflect.get(getDb(), property, receiver)
		return typeof value === 'function' ? value.bind(getDb()) : value
	}
})

export { schema }
