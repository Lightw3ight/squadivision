import {Injectable, OnInit} from '@angular/core';
import {SettingsService} from './settingsService';
import "andyet/SimpleWebRTC/simplewebrtc.bundle.js";

@Injectable()
export class WebRtcService {
    _rtc: any;

    constructor(private _settings: SettingsService) {

    }

}