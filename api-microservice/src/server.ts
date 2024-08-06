import express from 'express';
import { MessagingService } from './shared/infrastructure/messaging/messaging-service';
import { RabbitMQService } from './shared/infrastructure/messaging/rabbitmq/service';
import { ProductController } from './products/infrastructure/controllers/product.controller';
import { PublishProductUseCase } from './products/application/usecases/publish-product.usecase';
import { EnvConfigServiceFactory } from './shared/infrastructure/env-config/env-config.service';

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

const PORT = process.env.PORT;

app.listen(PORT ?? 3000, async () => {
	await messagingService.connect();

	console.log(`Server is running on port ${PORT}`);
});
