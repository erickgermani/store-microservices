import { Db, MongoClient } from 'mongodb';
import { MessagingService } from './infrastructure/messaging/messaging-service';
import { EnvConfigService } from './infrastructure/env-config/env-config.service';
import { CreateProductUseCase } from './application/usecases/create-product.usecase';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductRepository } from './infrastructure/repositories/product.repository';

export interface Dependencies {
	envConfigService: EnvConfigService;
	messagingService: MessagingService;
	mongoDb: Db;
	mongoClient: MongoClient;
	productRepository: ProductRepository;
	createProductUseCase: CreateProductUseCase.UseCase;
	productController: ProductController;
}
