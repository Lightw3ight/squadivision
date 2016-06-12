import {Injectable} from '@angular/core';

@Injectable()
export class SettingsService {
    private key = 'squadivision-monitor-config';

    public get() {
        return JSON.parse(localStorage.getItem(this.key));
    }

    public save(settings) {
        localStorage.setItem(this.key, JSON.stringify(settings))
    }
}
