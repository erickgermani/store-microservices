export class EntityValidationError extends Error {
	constructor(public message: string) {
		super(message);
		this.name = 'EntityValidationError';
	}
}
