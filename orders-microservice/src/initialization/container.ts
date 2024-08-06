import { OrderRepository } from '../domain/repositories/order.repository';
import { CreateOrderUseCase } from '../application/usecases/create-order.usecase';
import { OrderController } from '../infrastructure/controllers/order.controller';
import { initializeEnvConfigService } from './env';
import { initializeMessagingService } from './messaging';
import { initializeDatabase } from './database';
import { Dependencies } from '../types';

export async function initializeContainer(): Promise<Dependencies> {
	const envConfigService = initializeEnvConfigService();
	const messagingService = await initializeMessagingService();
	const { mongoDb, mongoClient } = await initializeDatabase();

	const orderRepository = new OrderRepository(mongoDb, mongoClient);
	const createOrderUseCase = new CreateOrderUseCase.UseCase(orderRepository);
	const orderController = new OrderController(messagingService, createOrderUseCase);

	return {
		envConfigService,
		messagingService,
		mongoDb,
		mongoClient,
		orderRepository,
		createOrderUseCase,
		orderController,
	};
}
