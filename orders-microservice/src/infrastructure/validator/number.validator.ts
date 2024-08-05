import { Validator } from './validator';

export class NumberValidator implements Validator {
	validate(value: any, name: string): string[] {
		const errors = [];
		if (typeof value !== 'number') {
			errors.push(`Field ${name} must be a number`);
		}
		return errors;
	}
}
