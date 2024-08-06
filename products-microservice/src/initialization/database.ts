import { connect, getClient, getDb } from '../infrastructure/database/mongodb/client';
import { Dependencies } from '../types';

export async function initializeDatabase(): Promise<{
	mongoDb: Dependencies['mongoDb'];
	mongoClient: Dependencies['mongoClient'];
}> {
	await connect();

	const mongoDb = getDb();
	const mongoClient = getClient();

	return { mongoDb, mongoClient };
}
