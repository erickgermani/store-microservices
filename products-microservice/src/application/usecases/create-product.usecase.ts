import { ProductEntity, ProductEntityFactory } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { RepositoryInterface } from '../../infrastructure/repositories/repository';
import { ProductOutput } from '../dtos/product-output';
import { UseCase as DefaultUseCase } from './usecase';

export namespace CreateProductUseCase {
	export type Input = {
		name: string;
		price: number;
		description?: string;
	};

	export type Output = ProductOutput;

	export class UseCase implements DefaultUseCase<Input, Output> {
		repository: RepositoryInterface<ProductEntity>;

		constructor(repository: ProductRepository) {
			this.repository = repository;
		}

		async execute(input: Input): Promise<Output> {
			const entity = ProductEntityFactory.create(input);

			await this.repository.insert(entity);

			return entity.toJSON();
		}
	}
}
