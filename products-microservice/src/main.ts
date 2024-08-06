import { initializeContainer } from './initialization/container';
import { Dependencies } from './types';

let container: Dependencies;

async function main() {
	container = await initializeContainer();

	const productController = container.productController;
	productController.consumeProductsQueue(container.envConfigService.getProductsQueue());
}

main();

process.on('SIGINT', async () => {
	console.log('Gracefully shutting down...');
	await container.messagingService.disconnect();
	process.exit(0);
});
