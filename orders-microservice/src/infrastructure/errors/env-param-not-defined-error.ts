export class EnvParamNotDefinedError extends Error {
	constructor(public message: string) {
		super(message);
		this.name = 'EnvParamNotDefinedError';
	}
}
