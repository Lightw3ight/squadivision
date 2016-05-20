import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {SocketService} from '../services/socketService';
import {SettingsService} from '../services/settingsService';
import {IAppSettings} from '../models/IAppSettings';

@Component({
	selector: 'screen-selector',
	templateUrl: '/app/popup/screenSelectorComponent.html',
	directives: [DROPDOWN_DIRECTIVES]
})
export class ScreenSelectorComponent implements OnInit {
	@Input() selectedScreen: string;
	@Output() changed = new EventEmitter<string>();
	config: IAppSettings;
	screens: string[];
	
	constructor(private settingsService: SettingsService, private socketService: SocketService) {
	}
	
	ngOnInit(){
		this.config = this.settingsService.get() || {};
		this.loadScreens();
	}

	loadScreens() {
		this.config = this.settingsService.get() || {};

		if (!this.config.serverUrl) {
			return;
		}

		this.socketService.connect(this.config.serverUrl);

		this.socketService.on<string[]>('monitor-list').then(screens =>{
			this.screens = screens;

			if (this.config.lastScreen && screens.indexOf(this.config.lastScreen) >= 0) {
				this.changeScreen(this.config.lastScreen);
			}
			else if (!this.selectedScreen && screens.length > 0) {
				this.changeScreen(this.screens[0]);
			}
		})

		this.socketService.emit('get-monitors');
	}

	changeScreen(screen) {
		this.config = this.settingsService.get() || {};
		this.config.lastScreen = screen;
		this.settingsService.set(this.config);
		this.changed.emit(screen);
	}
}