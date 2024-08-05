import { CreateProductUseCase } from '../../application/usecases/create-product.usecase';
import { EntityValidationError } from '../../domain/errors/entity-validation-error';
import { IntegerValidator } from '../validator/integer.validator';
import { NumberValidator } from '../validator/number.validator';
import { PositiveValidator } from '../validator/positive.validator';
import { RequiredValidator } from '../validator/required.validator';
import { StringValidator } from '../validator/string.validator';
import { ValidatorChain } from '../validator/validator';
import { Dto } from './dto';

export class CreateDto implements CreateProductUseCase.Input, Dto<CreateProductUseCase.Input> {
	name: string;
	price: number;
	description?: string;

	constructor(dto: CreateProductUseCase.Input) {
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
