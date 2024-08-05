import { OrderEntity, OrderEntityFactory } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { RepositoryInterface } from '../../domain/repositories/repository';
import { OrderOutput, OrderOutputMapper } from '../dtos/order-output';
import { UseCase as DefaultUseCase } from './usecase';

export namespace CreateOrderUseCase {
	export type Input = {
		quantityOfProducts: number;
		totalPrice: number;
	};

	export type Output = OrderOutput;

	export class UseCase implements DefaultUseCase<Input, Output> {
		repository: RepositoryInterface<OrderEntity>;

		constructor(repository: OrderRepository) {
			this.repository = repository;
		}

		async execute(input: Input): Promise<Output> {
			const entity = OrderEntityFactory.create(input);

			await this.repository.insert(entity);

			return OrderOutputMapper.toOutput(entity);
		}
	}
}
