import { ProductEntity } from '../../domain/entities/product.entity';
import { RepositoryInterface } from '../../infrastructure/repositories/repository';

export interface UseCase<Input, Output> {
	repository: RepositoryInterface<ProductEntity>;
	execute(input: Input): Output | Promise<Output>;
}
