import { Entity } from '../../../shared/domain/entities/entity';

export enum OrderStatus {
	CREATED = 'Created',
	PROCESSING_PAYMENT = 'Processing payment',
	PAYMENT_APPROVED = 'Payment approved',
	PAYMENT_DENIED = 'Payment denied',
	IN_DELIVERY = 'In delivery',
	DELIVERED = 'Deliverd',
	CANCELED = 'Canceled',
}

export interface OrderProps {
	quantityOfProducts: number;
	totalPrice: number;
	status?: OrderStatus;
	createdAt?: Date;
}

export class OrderEntity extends Entity<OrderProps> {
	constructor(public readonly props: OrderProps) {
		super(props);
		this.props.status = props.status ?? OrderStatus.CREATED;
		this.props.createdAt = props.createdAt ?? new Date();
	}

	get quantityOfProducts() {
		return this.props.quantityOfProducts;
	}

	get totalPrice() {
		return this.props.totalPrice;
	}

	get status() {
		return this.props.status;
	}

	get createdAt() {
		return this.props.createdAt;
	}
}

export class OrderEntityFactory {
	static create(props: OrderProps) {
		return new OrderEntity(props);
	}
}
