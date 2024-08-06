import dotenv from 'dotenv';
import { EnvParamNotDefinedError } from '../errors/env-param-not-defined-error';

export interface EnvConfig {
	getNodeEnv(): string;
	getOrdersQueue(): string;
	getProductsQueue(): string;
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

	getOrdersQueue(): string {
		const ordersQueue = process.env.ORDERS_QUEUE;

		if (!ordersQueue) throw new EnvParamNotDefinedError('Orders queue not defined');

		return ordersQueue;
	}

	getProductsQueue(): string {
		const productsQueue = process.env.PRODUCTS_QUEUE;

		if (!productsQueue) throw new EnvParamNotDefinedError('Products queue not defined');

		return productsQueue;
	}
}

export class EnvConfigServiceFactory {
	static create() {
		return EnvConfigService.getInstance();
	}
}
