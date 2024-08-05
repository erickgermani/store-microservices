import { Collection, Document, MongoClient, Db } from 'mongodb';
import { RepositoryInterface } from './repository';
import { ProductEntity } from '../../domain/entities/product.entity';

export class ProductRepository implements RepositoryInterface<ProductEntity> {
	private readonly collectionName = 'products';
	private readonly collection: Collection<Document>;

	constructor(private readonly database: Db, private readonly client: MongoClient) {
		this.database = database;
		this.client = client;
		this.collection = this.database.collection(this.collectionName);
	}

	async insert(entity: ProductEntity): Promise<void> {
		await this.client.connect();

		const model: Record<string, any> = {
			...entity.toJSON(),
			_id: entity.id,
		};

		delete model.id;

		await this.collection.insertOne(model);
	}
	findById(id: string): Promise<ProductEntity> {
		throw new Error('Method not implemented.');
	}
	findAll(): Promise<ProductEntity[]> {
		throw new Error('Method not implemented.');
	}
	update(entity: ProductEntity): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
