import { CreateOrderUseCase } from '../../application/usecases/create-order.usecase';
import { CreateDto } from '../dtos/create.dto';
import { MessagingService } from '../messaging/messaging-service';
import { OrderPresenter } from '../presenter/order.presenter';

export class OrderController {
	constructor(
		private readonly messagingService: MessagingService,
		private readonly createOrderUseCase: CreateOrderUseCase.UseCase
	) {
		this.messagingService = messagingService;
		this.createOrderUseCase = createOrderUseCase;
	}

	static orderToResponse(output: CreateOrderUseCase.Output) {
		return new OrderPresenter(output);
	}

	consumeOrdersQueue(ordersQueue: string) {
		this.messagingService.consumeMessages(ordersQueue, async (message) => {
			console.log('message :>> ', message);
			try {
				const order = JSON.parse(message);

				const createDto = new CreateDto(order);

				createDto.validate();

				const output = await this.createOrderUseCase.execute(createDto);

				console.log(OrderController.orderToResponse(output));
			} catch (error) {
				console.log('error :>> ', error);
			}
		});
	}
}
