import { OrderOutput } from '../../application/dtos/order-output';

export class OrderPresenter {
	id: string;
	totalPrice: number;
	quantityOfProducts: number;

	constructor(output: OrderOutput) {
		this.id = output.id;
		this.totalPrice = output.totalPrice;
		this.quantityOfProducts = output.quantityOfProducts;
	}
}
