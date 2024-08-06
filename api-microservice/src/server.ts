import express from 'express';
import { MessagingService } from './shared/infrastructure/messaging/messaging-service';
import { RabbitMQService } from './shared/infrastructure/messaging/rabbitmq/service';
import { OrderModule } from './orders/infrastructure/order.module';
import { ProductModule } from './products/infrastructure/product.module';
import { EnvConfigServiceFactory } from './shared/infrastructure/env-config/env-config.service';

const envConfigService = EnvConfigServiceFactory.create();

const app = express();

app.use(express.json());

const messagingService: MessagingService = new RabbitMQService();

const productModule = new ProductModule(messagingService);

app.use('/api/products', productModule.controller.getRouter());

const orderModule = new OrderModule(messagingService);

app.use('/api/orders', orderModule.controller.getRouter());

const PORT = envConfigService.getPort();

app.listen(PORT, async () => {
	await messagingService.connect();

	console.log(`Server is running on port ${PORT}`);
});
