export interface MessagingService {
	connect(): Promise<void>;
	sendMessage(queue: string, message: string): Promise<void>;
	consumeMessages(queue: string, onMessage: (message: string) => void): Promise<void>;
	disconnect(): Promise<void>;
}
