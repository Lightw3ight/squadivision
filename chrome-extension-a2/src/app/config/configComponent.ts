import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {SettingsService} from '../services/settingsService';
import {SocketService} from '../services/socketService';

import {IAppSettings} from '../models/IAppSettings';


@Component({
	selector: 'config-component',
	templateUrl: '/app/config/configComponent.html',
	directives: [ROUTER_DIRECTIVES]
})
export class ConfigComponent implements OnInit {
	settings: IAppSettings = {};
	activeSettings: IAppSettings = {};
	
	constructor(private settingsService: SettingsService, private socketService: SocketService, private _router: Router) {
	}
	
	ngOnInit(){
		this.loadSettings();
	}

	save() {
		this.settingsService.set(this.settings);
		this.socketService.disconnect();
		this._router.navigate(['/']);
	}

	canClose() {
		return !!this.activeSettings.serverUrl
	}

	loadSettings() {
		this.activeSettings = this.settingsService.get() || {};
		this.settings = Object.assign({}, this.activeSettings);
	}
}