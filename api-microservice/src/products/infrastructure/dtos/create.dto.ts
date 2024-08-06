import { EntityValidationError } from '../../../shared/domain/errors/entity-validation-error';
import { IntegerValidator } from '../../../shared/infrastructure/validator/integer.validator';
import { NumberValidator } from '../../../shared/infrastructure/validator/number.validator';
import { PositiveValidator } from '../../../shared/infrastructure/validator/positive.validator';
import { RequiredValidator } from '../../../shared/infrastructure/validator/required.validator';
import { StringValidator } from '../../../shared/infrastructure/validator/string.validator';
import { ValidatorChain } from '../../../shared/infrastructure/validator/validator';
import { PublishProductUseCase } from '../../application/usecases/publish-product.usecase';
import { Dto } from './dto';

export class CreateDto implements PublishProductUseCase.Input, Dto<PublishProductUseCase.Input> {
	name: string;
	price: number;
	description?: string;

	constructor(dto: PublishProductUseCase.Input) {
		this.name = dto.name;
		this.price = dto.price;
		this.description = dto.description;
	}

	validate(): void {
		const errors = [];

		errors.push(...this.validateStringRequired(this.name, 'name'));

		errors.push(...this.validatePositiveIntegerNumberRequired(this.price, 'price'));

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
