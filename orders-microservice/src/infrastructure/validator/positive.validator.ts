import { Validator } from './validator';

export class PositiveValidator implements Validator {
	validate(value: any, name: string): string[] {
		const errors = [];
		if (typeof value !== 'number' || value <= 0) {
			errors.push(`Field ${name} must be a positive value`);
		}
		return errors;
	}
}
