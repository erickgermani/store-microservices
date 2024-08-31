import amqp, { Connection, Channel } from 'amqplib';
import { MessagingService } from '../messaging-service';

export class RabbitMQService implements MessagingService {
	private connection: Connection | null = null;
	private channel: Channel | null = null;

	async connect(): Promise<void> {
		try {
			this.connection = await amqp.connect('amqp://rabbitmq');
			this.channel = await this.connection.createChannel();
			console.log('Connected to RabbitMQ');
		} catch (error) {
			console.error('Error connecting to RabbitMQ', error);
			throw error;
		}
	}

	async sendMessage(queue: string, message: string): Promise<void> {
		if (!this.channel) throw new Error('Channel is not initialized');
		await this.channel.assertQueue(queue, { durable: true });
		await this.channel.sendToQueue(queue, Buffer.from(message));
	}

	async consumeMessages(queue: string, onMessage: (message: string) => void): Promise<void> {
		if (!this.channel) throw new Error('Channel is not initialized');
		await this.channel.assertQueue(queue, { durable: true });
		this.channel.consume(queue, (msg) => {
			if (msg) {
				onMessage(msg.content.toString());
				this.channel!.ack(msg);
			}
		});
	}

	async disconnect(): Promise<void> {
		if (this.channel) await this.channel.close();
		if (this.connection) await this.connection.close();
	}
}
