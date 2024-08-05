import { Validator } from './validator';

export class IntegerValidator implements Validator {
	validate(value: any, name: string): string[] {
		const errors = [];
		if (typeof value !== 'number' || !Number.isInteger(value)) {
			errors.push(`Field ${name} must be a integer`);
		}
		return errors;
	}
}
