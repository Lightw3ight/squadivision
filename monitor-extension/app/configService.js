class ConfigService{
	constructor(localStorageService){
		this.configKey = 'squadivision-monitor-config';
		this.localStorageService = localStorageService;
	}
	
	getConfig(){
		return this.localStorageService.get(this.configKey) || {};
	}
	
	saveConfig(config){
		this.localStorageService.set(this.configKey, config);
	}
}

angular.module('app').service('configService', ConfigService);