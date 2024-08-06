import { UseCase as DefaultUseCase } from '../../../shared/application/usecases/usecase';
import { MessagingService } from '../../../shared/infrastructure/messaging/messaging-service';

export namespace PublishProductUseCase {
	export type Input = {
		name: string;
		price: number;
		description?: string;
	};

	export type Output = void;

	export class UseCase implements DefaultUseCase<Input, Output> {
		constructor(
			private readonly messagingService: MessagingService,
			private readonly queueName: string
		) {
			this.messagingService = messagingService;
			this.queueName = queueName;
		}

		async execute(input: Input): Promise<Output> {
			await this.messagingService.sendMessage(this.queueName, JSON.stringify(input));
		}
	}
}
