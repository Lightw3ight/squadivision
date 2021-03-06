import {Injectable} from '@angular/core';
import io from 'socket.io-client';

@Injectable()
export class SocketService {
    private originalFunctionKey = '__socketCallBack';
    private socket: SocketIOClient.Socket;

    connect(serverUrl, query) {
        let _self = this;

        if (_self.socket) {
            _self.socket.disconnect();
        }

        _self.socket = io(serverUrl, {query: query});

        _self.socket.connect();
        _self.socket.on('connect', _self.onConnect);
        _self.socket.on('disconnect', _self.onDisconnect);
        _self.socket.on('error', _self.onError);
    }

    wrapCallback(callback) {
        var s = this.socket;

        return function () {
            var args = arguments;
            setTimeout(() => {
                callback.apply(s, args);
            }, 0);
        };
    }

    onError() {
        console.log('socket: error');
    }

    onConnect() {
        console.log('socket: connected');
    }

    onDisconnect() {
        console.log('socket: disconnected');
    }

    //on<T>(eventName: string, callback: ((data: T) => void));

    on(eventName, callback) {
        this.socket.on(eventName, callback[this.originalFunctionKey] = this.wrapCallback(callback));
    }

    off(eventName, callback) {
        this.socket.off(eventName, callback[this.originalFunctionKey]);
    }

    emit(eventName, data, callback) {
        this.socket.emit(eventName, data, () => {
            callback();
        });
    }
}
