import { CreateOrderUseCase } from '../../application/usecases/create-order.usecase';
import { EntityValidationError } from '../../domain/errors/entity-validation-error';
import { Dto } from './dto';
import { ValidatorChain } from '../validator/validator';
import { RequiredValidator } from '../validator/required.validator';
import { NumberValidator } from '../validator/number.validator';
import { PositiveValidator } from '../validator/positive.validator';
import { IntegerValidator } from '../validator/integer.validator';

export class CreateDto implements CreateOrderUseCase.Input, Dto<CreateOrderUseCase.Input> {
	quantityOfProducts: number;
	totalPrice: number;

	constructor(dto: CreateOrderUseCase.Input) {
		this.quantityOfProducts = dto.quantityOfProducts;
		this.totalPrice = dto.totalPrice;
	}

	validate(): void {
		const errors = [];

		errors.push(
			...this.validatePositiveIntegerNumberRequired(
				this.quantityOfProducts,
				'quantityOfProducts'
			)
		);
		errors.push(...this.validatePositiveIntegerNumberRequired(this.totalPrice, 'totalPrice'));

		if (errors.length)
			throw new EntityValidationError(
				`The following errors occurred: ['${errors.join("', '")}']`
			);
	}

	private validatePositiveIntegerNumberRequired(value: number, name: string) {
		const chain = new ValidatorChain();

		chain.addValidator(new RequiredValidator());
		chain.addValidator(new NumberValidator());
		chain.addValidator(new IntegerValidator());
		chain.addValidator(new PositiveValidator());

		return chain.validate(value, name);
	}
}
