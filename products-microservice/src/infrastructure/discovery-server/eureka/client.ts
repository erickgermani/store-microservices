import { Eureka } from 'eureka-js-client';
import { v4 as uuidv4 } from 'uuid';

const client = new Eureka({
	eureka: {
		host: 'localhost',
		port: 8761,
		servicePath: '/eureka/apps',
	},
	instance: {
		app: 'products-microservice',
		hostName: 'localhost',
		ipAddr: '127.0.0.1',
		port: {
			$: 0,
			'@enabled': true,
		},
		vipAddress: 'products-microservice',
		secureVipAddress: 'products-microservice',
		dataCenterInfo: {
			'@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
			name: 'MyOwn',
		},
		instanceId: `products-microservice:${uuidv4()}`,
	},
});

export { client };
