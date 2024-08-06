import { Entity } from '../../../shared/domain/entities/entity';

export interface ProductProps {
	name: string;
	price: number;
	description?: string;
	createdAt?: Date;
}

export class ProductEntity extends Entity<ProductProps> {
	constructor(props: ProductProps) {
		super(props);
		this.props.createdAt = props.createdAt ?? new Date();
	}

	get name() {
		return this.props.name;
	}

	get price() {
		return this.props.price;
	}

	get description() {
		return this.props.description;
	}

	get createdAt() {
		return this.props.createdAt;
	}
}

export class ProductEntityFactory {
	static create(props: ProductProps) {
		return new ProductEntity(props);
	}
}
