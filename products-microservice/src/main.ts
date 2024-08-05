import { CreateProductUseCase } from './application/usecases/create-product.usecase';
import { ProductController } from './infrastructure/controllers/product.controller';
import { connect, getClient, getDb } from './infrastructure/database/mongodb/client';
import { client as eurekaClient } from './infrastructure/discovery-server/eureka/client';
import { EnvConfigServiceFactory } from './infrastructure/env-config/env-config.service';
import { MessagingService } from './infrastructure/messaging/messaging-service';
import { RabbitMQService } from './infrastructure/messaging/rabbitmq/service';
import { ProductRepository } from './infrastructure/repositories/product.repository';

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

	const productRepository = new ProductRepository(getDb(), getClient());

	const createProductUseCase = new CreateProductUseCase.UseCase(productRepository);

	const productController = new ProductController(messagingService, createProductUseCase);

	productController.consumeProductsQueue(envConfigService.getProductsQueue());

	// messagingService.consumeMessages(envConfigService.getOrdersQueue(), async (message) => {
	// 	console.log('message :>> ', message);
	// 	try {
	// 		const product = JSON.parse(message);

	// 		console.log('product :>> ', product);

	// 		// const createDto = new CreateDto(order);

	// 		// await productController.create(createDto);
	// 	} catch (error) {
	// 		console.log('error :>> ', error);
	// 	}
	// });
}

main();

process.on('SIGINT', async () => {
	console.log('Gracefully shutting down...');
	await messagingService.disconnect();
	process.exit(0);
});
