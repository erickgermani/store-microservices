import { Router } from 'express';
import { PublishProductUseCase } from '../../application/usecases/publish-product.usecase';
import { CreateDto } from '../dtos/create.dto';
import { EntityValidationError } from '../../../shared/domain/errors/entity-validation-error';

export class ProductController {
	constructor(private readonly publicProductUseCase: PublishProductUseCase.UseCase) {
		this.publicProductUseCase = publicProductUseCase;
	}

	getRouter() {
		const router = Router();

		router.post('/', async (req, res) => {
			try {
				const createDto = new CreateDto(req.body);

				createDto.validate();

				await this.publicProductUseCase.execute(createDto);

				res.status(201).json({ message: 'Product published successfully' });
			} catch (error) {
				if (error instanceof EntityValidationError)
					return res.status(400).json({
						message: error.message,
					});

				res.status(500).json({ message: 'Internal server error' });
			}
		});

		return router;
	}
}
