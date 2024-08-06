import { initializeContainer } from './initialization/container';
import { Dependencies } from './types';

let container: Dependencies;

async function main() {
	container = await initializeContainer();

	const orderController = container.orderController;
	orderController.consumeOrdersQueue(container.envConfigService.getOrdersQueue());
}

main();

process.on('SIGINT', async () => {
	console.log('Gracefully shutting down...');
	await container.messagingService.disconnect();
	process.exit(0);
});
