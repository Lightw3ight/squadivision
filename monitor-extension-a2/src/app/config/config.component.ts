import {Component, OnInit} from '@angular/core';

import {SettingsService} from '../services/settings.service'
import {SocketService} from '../services/socket.service'

@Component({
    selector: 'monitor-config',
    templateUrl: '/app/config/config.component.html'
})
export class ConfigComponent implements OnInit {
    private backgroundPort:any;

    public activeSettings: any;
    public settings: any;

    constructor(private socketService:SocketService,
                private settingsService:SettingsService) {
    }

    ngOnInit() {
        this.activeSettings = this.settingsService.get() || {};
        this.settings = Object.assign({}, this.activeSettings);
        //noinspection TypeScriptUnresolvedVariable
        this.backgroundPort = chrome.extension.connect({name: "Background Communication port"});
    }

    saveConfig() {
        this.settingsService.save(this.settings);
        setTimeout(() => {
            this.backgroundPort.postMessage(Object.assign({}, this.settings));
            window.close();
        }, 300);
    }
}