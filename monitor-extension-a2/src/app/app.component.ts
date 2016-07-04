import {Component} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

import {MonitorComponent} from './monitor/monitor.component';
import {ConfigComponent} from './config/config.component';
import {VideoConferenceComponent} from './video/videoConferenceComponent';

import {SettingsService} from './services/settingsService';
import {SocketService} from './services/socket.service';

@Component({
    selector: 'squad-vision-monitor',
    templateUrl: './app/app.component.html',
    directives: ROUTER_DIRECTIVES,
    providers: [
        HTTP_PROVIDERS,
        SocketService,
        SettingsService
    ]
})
@Routes([
    {path: '/', component: MonitorComponent},
    {path: '/config', component: ConfigComponent},
    {path: '/video', component: VideoConferenceComponent}
])
export class AppComponent {
    constructor(private router: Router){

    }
}
