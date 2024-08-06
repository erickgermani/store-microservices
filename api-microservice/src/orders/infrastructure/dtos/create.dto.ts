import { EntityValidationError } from '../../../shared/domain/errors/entity-validation-error';
import { Dto } from '../../../shared/infrastructure/dtos/dto';
import { IntegerValidator } from '../../../shared/infrastructure/validator/integer.validator';
import { NumberValidator } from '../../../shared/infrastructure/validator/number.validator';
import { PositiveValidator } from '../../../shared/infrastructure/validator/positive.validator';
import { RequiredValidator } from '../../../shared/infrastructure/validator/required.validator';
import { StringValidator } from '../../../shared/infrastructure/validator/string.validator';
import { ValidatorChain } from '../../../shared/infrastructure/validator/validator';
import { PublishOrderUseCase } from '../../application/usecases/publish-order.usecase';

export class CreateDto implements PublishOrderUseCase.Input, Dto<PublishOrderUseCase.Input> {
	quantityOfProducts: number;
	totalPrice: number;

	constructor(dto: PublishOrderUseCase.Input) {
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

	private validateStringRequired(value: string, name: string) {
		const chain = new ValidatorChain();

		chain.addValidator(new RequiredValidator());
		chain.addValidator(new StringValidator());

		return chain.validate(value, name);
	}
}
