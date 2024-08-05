import { OrderEntity } from '../../domain/entities/order.entity';

export type OrderOutput = {
	id: string;
	quantityOfProducts: number;
	totalPrice: number;
	createdAt: Date;
};

export class OrderOutputMapper {
	static toOutput(entity: OrderEntity): OrderOutput {
		return entity.toJSON();
	}
}
