import { ProductEntity } from '../../domain/entities/product.entity';

export type ProductOutput = {
	id: string;
	name: string;
	price: number;
	description?: string;
	createdAt: Date;
};

export class ProductOutputMapper {
	static toOutput(entity: ProductEntity): ProductOutput {
		return entity.toJSON();
	}
}
