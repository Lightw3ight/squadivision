import {Component, OnInit} from '@angular/core';
// import "andyet/SimpleWebRTC/simplewebrtc.bundle.js";

import {SettingsService} from "../services/settingsService";
import {IAppSettings} from "../models/IAppSettings";

@Component({
    selector: 'video-conference',
    templateUrl: '/app/video/videoConferenceComponent.html'
})
export class VideoConferenceComponent implements OnInit {
    private _rtc: any;
    private _rtcReady: boolean;
    private _settings: IAppSettings;

    venue: string;
    connectionState: string;
    localVideoElement: string = 'video-stream__local';
    remoteVideos: any[];


    constructor(private _settingsService: SettingsService) {

    }

    ngOnInit():any {
        this._settings = this._settingsService.get() || {};
        this.venue = this._settings.lastScreen;
        this.initialiseRTC();
    }

    private initialiseRTC() {
        //noinspection TypeScriptUnresolvedFunction
        this._rtc = new SimpleWebRTC({
            // the id/element dom element that will hold "our" video
            localVideoEl: this.localVideoElement,
            // the id/element dom element that will hold remote videos
            remoteVideosEl: '',
            // immediately ask for camera access
            autoRequestMedia: true,
            url: this._settings.serverUrl
        });

        // wire up RTC event handling
        this._rtc.on('readyToCall', (sessionId: string) => {
            this.rtcReady(sessionId);
        });

        this._rtc.on('videoAdded', (video: HTMLElement, peer: any) => {
            this.videoAdded(video, peer);
        });

        this._rtc.on('videoRemoved', (video, peer) => {
            this.videoRemoved(video, peer);
        });
    }

    private rtcReady(sessionId:string) {
        console.log(`session established: ${sessionId}`);
        this._rtcReady = true;
    }

    private videoAdded(video:HTMLElement, peer:any) {
        this.remoteVideos.push(video);
        console.log(`peer connected: ${peer}`);
    }

    private videoRemoved(video:HTMLElement, peer:any) {
        for (var i=0; i<this.remoteVideos.length; i++) {
            if(this.remoteVideos[i].id === video.id) {
                this.remoteVideos.splice(i,1);
                break;
            }
        }
        console.log(`peer disconnected: ${peer}`);
    }

    public connectToVenue(venue: string) {
        this.venue = venue;
    }

    public startLocalVideo() {

    }

    public stopLocalVideo() {

    }

}