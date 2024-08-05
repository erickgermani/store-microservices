import { ProductOutput } from '../../application/dtos/product-output';

export class ProductPresenter {
	id: string;
	name: string;
	price: number;
	description?: string;
	createdAt: Date;

	constructor(output: ProductOutput) {
		this.id = output.id;
		this.name = output.name;
		this.price = output.price;
		this.description = output.description;
		this.createdAt = output.createdAt;
	}
}
