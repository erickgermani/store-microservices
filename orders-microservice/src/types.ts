import { Db, MongoClient } from 'mongodb';
import { MessagingService } from './infrastructure/messaging/messaging-service';
import { EnvConfigService } from './infrastructure/env-config/env-config.service';
import { OrderRepository } from './domain/repositories/order.repository';
import { CreateOrderUseCase } from './application/usecases/create-order.usecase';
import { OrderController } from './infrastructure/controllers/order.controller';

export interface Dependencies {
	envConfigService: EnvConfigService;
	messagingService: MessagingService;
	mongoDb: Db;
	mongoClient: MongoClient;
	orderRepository: OrderRepository;
	createOrderUseCase: CreateOrderUseCase.UseCase;
	orderController: OrderController;
}
