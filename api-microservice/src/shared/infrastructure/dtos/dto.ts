export interface Dto<T> {
	validate(data: T): void;
}
