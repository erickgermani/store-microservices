import { CreateProductUseCase } from '../../application/usecases/create-product.usecase';
import { CreateDto } from '../dtos/create.dto';
import { MessagingService } from '../messaging/messaging-service';
import { ProductPresenter } from '../presenter/product.presenter';

export class ProductController {
	constructor(
		private readonly messagingService: MessagingService,
		private readonly createProductUseCase: CreateProductUseCase.UseCase
	) {
		this.messagingService = messagingService;
		this.createProductUseCase = createProductUseCase;
	}

	static productToResponse(output: CreateProductUseCase.Output) {
		return new ProductPresenter(output);
	}

	consumeProductsQueue(productsQueue: string) {
		this.messagingService.consumeMessages(productsQueue, async (message) => {
			console.log('message :>> ', message);
			try {
				const product = JSON.parse(message);

				const createDto = new CreateDto(product);

				createDto.validate();

				const output = await this.createProductUseCase.execute(createDto);

				console.log(ProductController.productToResponse(output));
			} catch (error) {
				console.log('error :>> ', error);
			}
		});
	}
}
