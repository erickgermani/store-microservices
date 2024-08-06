import { Validator } from './validator';

export class StringValidator implements Validator {
	validate(value: any, name: string): string[] {
		const errors = [];
		if (typeof value !== 'string') {
			errors.push(`Field ${name} must be a string`);
		}
		return errors;
	}
}
