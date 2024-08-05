import { Collection, Document, MongoClient, Db } from 'mongodb';
import { OrderEntity } from '../entities/order.entity';
import { RepositoryInterface } from './repository';

export class OrderRepository implements RepositoryInterface<OrderEntity> {
	private readonly collectionName = 'orders';
	private readonly collection: Collection<Document>;

	constructor(private readonly database: Db, private readonly client: MongoClient) {
		this.database = database;
		this.client = client;
		this.collection = this.database.collection(this.collectionName);
	}

	async insert(entity: OrderEntity): Promise<void> {
		await this.client.connect();

		const model: Record<string, any> = {
			...entity.toJSON(),
			_id: entity.id,
		};

		delete model.id;

		await this.collection.insertOne(model);
	}
	findById(id: string): Promise<OrderEntity> {
		throw new Error('Method not implemented.');
	}
	findAll(): Promise<OrderEntity[]> {
		throw new Error('Method not implemented.');
	}
	update(entity: OrderEntity): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
