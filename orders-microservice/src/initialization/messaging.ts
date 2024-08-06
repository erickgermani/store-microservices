import { RabbitMQService } from '../infrastructure/messaging/rabbitmq/service';
import { MessagingService } from '../infrastructure/messaging/messaging-service';
import { Dependencies } from '../types';

export async function initializeMessagingService(): Promise<Dependencies['messagingService']> {
	const messagingService: MessagingService = new RabbitMQService();

	await messagingService.connect();

	return messagingService;
}
