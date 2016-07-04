import {Injectable} from '@angular/core';

import {IAppSettings} from '../models/IAppSettings';

@Injectable()
export class SettingsService {
    private key = 'squadivision-monitor-config';

    public get(): IAppSettings {
        return <IAppSettings>JSON.parse(localStorage.getItem(this.key));
    }

    public save(settings: IAppSettings) {
        localStorage.setItem(this.key, JSON.stringify(settings))
    }
}
