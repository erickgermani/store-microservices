import { Validator } from './validator';

export class RequiredValidator implements Validator {
	validate(value: any, name: string): string[] {
		const errors = [];
		if (value === undefined || value === null) {
			errors.push(`Field ${name} must be defined`);
		}
		return errors;
	}
}
