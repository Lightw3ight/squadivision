import {Component, OnInit} from '@angular/core';

import {SettingsService} from '../services/settingsService'
import {IAppSettings} from "../models/IAppSettings";

@Component({
    selector: 'monitor-config',
    templateUrl: '/app/config/config.component.html'
})
export class ConfigComponent implements OnInit {
    private backgroundPort:any;

    public activeSettings: IAppSettings;
    public settings: IAppSettings;

    constructor(
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