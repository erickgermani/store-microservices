import { OrderEntity } from '../../domain/entities/order.entity';
import { RepositoryInterface } from '../../domain/repositories/repository';

export interface UseCase<Input, Output> {
	repository: RepositoryInterface<OrderEntity>;
	execute(input: Input): Output | Promise<Output>;
}
