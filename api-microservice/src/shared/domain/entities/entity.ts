export abstract class Entity<Props = any> {
	public readonly props: Props;

	constructor(props: Props) {
		this.props = props;
	}

	toJSON(): Props {
		return {
			...this.props,
		};
	}
}
