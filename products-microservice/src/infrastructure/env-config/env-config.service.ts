import dotenv from 'dotenv';
import { EnvParamNotDefinedError } from '../errors/env-param-not-defined-error';

export interface EnvConfig {
	getNodeEnv(): string;
	getProductsQueue(): string;
	getDatabaseUri(): string;
	getDatabaseName(): string;
}

export class EnvConfigService implements EnvConfig {
	static instance: EnvConfigService;

	private constructor() {
		dotenv.config();
	}

	static getInstance() {
		if (!EnvConfigService.instance) EnvConfigService.instance = new EnvConfigService();

		return EnvConfigService.instance;
	}

	getNodeEnv(): string {
		return process.env.NODE_ENV || 'development';
	}

	getProductsQueue(): string {
		const productsQueue = process.env.PRODUCTS_QUEUE;

		if (!productsQueue) throw new EnvParamNotDefinedError('Products queue not defined');

		return productsQueue;
	}

	getDatabaseUri(): string {
		const databaseUri = process.env.DATABASE_URI;

		if (!databaseUri) throw new EnvParamNotDefinedError('Database URI not defined');

		return databaseUri;
	}

	getDatabaseName(): string {
		const databaseName = process.env.DATABASE_NAME;

		if (!databaseName) throw new EnvParamNotDefinedError('Database URI not defined');

		return databaseName;
	}
}

export class EnvConfigServiceFactory {
	static create() {
		return EnvConfigService.getInstance();
	}
}
