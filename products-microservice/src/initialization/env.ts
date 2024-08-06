import { EnvConfigServiceFactory } from '../infrastructure/env-config/env-config.service';
import { Dependencies } from '../types';

export function initializeEnvConfigService(): Dependencies['envConfigService'] {
	const envConfigService = EnvConfigServiceFactory.create();

	return envConfigService;
}
