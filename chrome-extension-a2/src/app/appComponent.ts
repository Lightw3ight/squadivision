import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router, ROUTER_PROVIDERS } from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';


import {PopupComponent} from './popup/popupComponent';
import {ConfigComponent} from './config/configComponent';

import {SettingsService} from './services/settingsService';
import {GiphyService} from './services/giphyService';
import {UrlTransformService} from './services/urlTransformService';
import {SocketService} from './services/socketService';

@Component({
	selector: 'app-component',
	templateUrl: '/app/appComponent.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS,
		SettingsService,
		SocketService,
		GiphyService,
		UrlTransformService,
		HTTP_PROVIDERS
	]
})
@Routes([
	{path: '/', component: PopupComponent},
	{path: '/config', component: ConfigComponent}
])
export class AppComponent{
	constructor(private router: Router){
		
	}
	
	ngOnInit() {
		//this.router.navigate(['/popup']);
	}
}