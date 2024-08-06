import { Router } from 'express';
import { CreateDto } from '../dtos/create.dto';
import { EntityValidationError } from '../../../shared/domain/errors/entity-validation-error';
import { PublishOrderUseCase } from '../../application/usecases/publish-order.usecase';

export class OrderController {
	constructor(private readonly publicOrderUseCase: PublishOrderUseCase.UseCase) {
		this.publicOrderUseCase = publicOrderUseCase;
	}

	getRouter() {
		const router = Router();

		router.post('/', async (req, res) => {
			try {
				const createDto = new CreateDto(req.body);

				createDto.validate();

				await this.publicOrderUseCase.execute(createDto);

				res.status(201).json({ message: 'Order published successfully' });
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
