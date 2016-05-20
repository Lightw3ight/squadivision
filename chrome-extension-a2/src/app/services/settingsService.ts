import {Injectable} from '@angular/core';
import {IAppSettings} from '../models/IAppSettings';

@Injectable()
export class SettingsService {
	key = 'squadivision-client-config';
	
	constructor() {
	}

	get(): IAppSettings {
		return JSON.parse(localStorage.getItem(this.key));
	}

	set(settings: IAppSettings) {
		localStorage.setItem(this.key, JSON.stringify(settings))
	}
}