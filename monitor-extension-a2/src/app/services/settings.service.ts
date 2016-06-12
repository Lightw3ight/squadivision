import {Injectable} from '@angular/core';

import {ISettings} from './ISettings';

@Injectable()
export class SettingsService {
    private key = 'squadivision-monitor-config';

    public get(): ISettings {
        return <ISettings>JSON.parse(localStorage.getItem(this.key));
    }

    public save(settings) {
        localStorage.setItem(this.key, JSON.stringify(settings))
    }
}
