import { PublishProductUseCase } from '../../products/application/usecases/publish-product.usecase';
import { Controller } from '../../shared/infrastructure/controller';
import { EnvConfigServiceFactory } from '../../shared/infrastructure/env-config/env-config.service';
import { MessagingService } from '../../shared/infrastructure/messaging/messaging-service';
import { Module } from '../../shared/infrastructure/module';
import { ProductController } from './controllers/product.controller';

const envConfigService = EnvConfigServiceFactory.create();

export class ProductModule implements Module {
	controller: Controller;

	constructor(readonly messagingService: MessagingService) {
		this.messagingService = messagingService;

		const publishProductUseCase = new PublishProductUseCase.UseCase(
			messagingService,
			envConfigService.getProductsQueue()
		);

		this.controller = new ProductController(publishProductUseCase);
	}
}
