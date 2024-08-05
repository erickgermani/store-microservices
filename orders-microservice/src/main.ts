import { OrderController } from './infrastructure/controllers/order.controller';
import { client as eurekaClient } from './infrastructure/discovery-server/eureka/client';
import { RabbitMQService } from './infrastructure/messaging/rabbitmq/service';
import { MessagingService } from './infrastructure/messaging/messaging-service';
import { CreateOrderUseCase } from './application/usecases/create-order.usecase';
import { EnvConfigServiceFactory } from './infrastructure/env-config/env-config.service';
import { connect, getClient, getDb } from './infrastructure/database/mongodb/client';
import { OrderRepository } from './domain/repositories/order.repository';

const envConfigService = EnvConfigServiceFactory.create();

const messagingService: MessagingService = new RabbitMQService();

async function main() {
	await connect();

	// eurekaClient.start((error: Error) => {
	// 	if (error) {
	// 		console.error('Error starting Eureka client', error);
	// 	} else {
	// 		console.log('Eureka client started');
	// 	}
	// });

	await messagingService.connect();

	const orderRepository = new OrderRepository(getDb(), getClient());

	const createOrderUseCase = new CreateOrderUseCase.UseCase(orderRepository);

	const orderController = new OrderController(messagingService, createOrderUseCase);

	orderController.consumeOrdersQueue(envConfigService.getOrdersQueue());
}

main();

process.on('SIGINT', async () => {
	console.log('Gracefully shutting down...');
	await messagingService.disconnect();
	process.exit(0);
});
