export interface Validator {
	validate(value: any, name: string): string[];
}

export class ValidatorChain {
	private validators: Validator[] = [];

	addValidator(validator: Validator): void {
		this.validators.push(validator);
	}

	validate(value: any, name: string): string[] {
		return this.validators.flatMap((validator) => validator.validate(value, name));
	}
}
