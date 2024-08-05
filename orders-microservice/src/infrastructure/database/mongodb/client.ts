import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import { EnvConfigServiceFactory } from '../../env-config/env-config.service';

const envConfigService = EnvConfigServiceFactory.create();

let db: Db;

const client = new MongoClient(envConfigService.getDatabaseUri(), {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export async function connect() {
	try {
		await client.connect();

		await client.db('admin').command({ ping: 1 });
		console.log('Pinged your deployment. You successfully connected to MongoDB!');

		db = client.db(envConfigService.getDatabaseName());
	} finally {
		await client.close();
	}
}

export function getDb(): Db {
	if (!db) throw new Error('Database not connected');

	return db;
}

export function getClient(): MongoClient {
	return client;
}
