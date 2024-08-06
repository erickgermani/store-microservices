import express from 'express';
import { MessagingService } from './shared/infrastructure/messaging/messaging-service';
import { RabbitMQService } from './shared/infrastructure/messaging/rabbitmq/service';
import { ProductController } from './products/infrastructure/controllers/product.controller';
import { PublishProductUseCase } from './products/application/usecases/publish-product.usecase';
import { EnvConfigServiceFactory } from './shared/infrastructure/env-config/env-config.service';
import { PublishOrderUseCase } from './orders/application/usecases/publish-order.usecase';
import { OrderController } from './orders/infrastructure/controllers/product.controller';

const envConfigService = EnvConfigServiceFactory.create();

const app = express();

app.use(express.json());

const messagingService: MessagingService = new RabbitMQService();

const publishProductUseCase = new PublishProductUseCase.UseCase(
	messagingService,
	envConfigService.getProductsQueue()
);

const productController = new ProductController(publishProductUseCase);

app.use('/api/products', productController.getRouter());

const publishOrderUseCase = new PublishOrderUseCase.UseCase(
	messagingService,
	envConfigService.getOrdersQueue()
);

const orderController = new OrderController(publishOrderUseCase);

app.use('/api/orders', orderController.getRouter());

const PORT = process.env.PORT;

app.listen(PORT ?? 3000, async () => {
	await messagingService.connect();

	console.log(`Server is running on port ${PORT}`);
});
