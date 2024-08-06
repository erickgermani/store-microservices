import { CreateProductUseCase } from '../application/usecases/create-product.usecase';
import { ProductController } from '../infrastructure/controllers/product.controller';
import { initializeEnvConfigService } from './env';
import { initializeMessagingService } from './messaging';
import { initializeDatabase } from './database';
import { ProductRepository } from '../infrastructure/repositories/product.repository';
import { Dependencies } from '../types';

export async function initializeContainer(): Promise<Dependencies> {
	const envConfigService = initializeEnvConfigService();
	const messagingService = await initializeMessagingService();
	const { mongoDb, mongoClient } = await initializeDatabase();

	const productRepository = new ProductRepository(mongoDb, mongoClient);
	const createProductUseCase = new CreateProductUseCase.UseCase(productRepository);
	const productController = new ProductController(messagingService, createProductUseCase);

	return {
		envConfigService,
		messagingService,
		mongoDb,
		mongoClient,
		productRepository,
		createProductUseCase,
		productController,
	};
}
