import { PublishOrderUseCase } from '../../orders/application/usecases/publish-order.usecase';
import { Controller } from '../../shared/infrastructure/controller';
import { EnvConfigServiceFactory } from '../../shared/infrastructure/env-config/env-config.service';
import { MessagingService } from '../../shared/infrastructure/messaging/messaging-service';
import { Module } from '../../shared/infrastructure/module';
import { OrderController } from './controllers/order.controller';

const envConfigService = EnvConfigServiceFactory.create();

export class OrderModule implements Module {
	controller: Controller;

	constructor(readonly messagingService: MessagingService) {
		this.messagingService = messagingService;

		const publishOrderUseCase = new PublishOrderUseCase.UseCase(
			messagingService,
			envConfigService.getOrdersQueue()
		);

		this.controller = new OrderController(publishOrderUseCase);
	}
}
