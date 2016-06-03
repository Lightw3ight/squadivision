import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

//Services
import {SettingsService} from '../services/settingsService';
import {GiphyService} from '../services/giphyService';
import {UrlTransformService} from '../services/urlTransformService';
import {SocketService} from '../services/socketService';

//Components
import {BroadcastBarComponent} from './broadcastBarComponent';
import {TimeoutSelectorComponent} from './timeoutSelectorComponent';
import {ScreenSelectorComponent} from './screenSelectorComponent';
import {ScrollPadComponent} from './scrollPadComponent';

//Models
import {IAppSettings} from '../models/IAppSettings';

@Component({
	selector: 'popup',
	templateUrl: '/app/popup/popupComponent.html',
	directives: [
		ROUTER_DIRECTIVES,
		BroadcastBarComponent,
		TimeoutSelectorComponent,
		ScreenSelectorComponent,
		ScrollPadComponent
	]
})
export class PopupComponent {
	 config: IAppSettings;
	 selectedMonitor: string;
	 timeout: number;
	
	constructor(private _socketService: SocketService, private _settingsService: SettingsService, private _router: Router) {
	}
	
	ngOnInit(){
		this.config = this._settingsService.get() || {};
		if (this.config.serverUrl) {
			this.connectToServer();
		} else {
			this._router.navigate(['/config']);
		}
	}
	
	openVideoPage(){
		chrome.tabs.create({ url: 'index.html#/video' });
	}
	
	broadcast(value, timeout: number, monitorId: string) {
		timeout = timeout || (value.type === 'giphy' ? 15 : null);
		this.sendToMonitor(value.url, monitorId, timeout);
	}

	scrollMonitor(direction: number) {
		this._socketService.emit('scroll', { direction: direction, monitorId: this.selectedMonitor })
	}

	updateSettings(settings) {
		this.config = settings;
		this.connectToServer();
	}

	connectToServer() {
		this._socketService.connect(this.config.serverUrl);
	}

	sendToMonitor(url: string, monitorId:string, timeout: number) {
		chrome.cookies.getAll({ url: url }, (bikkies) => {
			this._socketService.emit('url', { url: url, monitorId: monitorId, cookies: bikkies, timeout: timeout }, (a, b, c) => {
				window.close();
			});
		});
	}
}
