import io from 'socket.io-client';
import {Injectable} from '@angular/core';

@Injectable()
export class SocketService {
	originalFunctionKey = '__socketCallBack';
	socket: SocketIOClient.Socket;

	constructor() {
	}

	disconnect() {
		this.socket.disconnect();
		this.socket.off('connect')
		this.socket.off('disconnect')
		this.socket.off('error')
		this.socket = null;
	}

	connect(serverUrl, query?) {
		if (this.socket && this.socket.connected) {
			return;
		}
		this.socket = io(serverUrl, { query: query });

		this.socket.connect();
		this.socket.on('connect', this.onConnect);
		this.socket.on('disconnect', this.onDisconnect);
		this.socket.on('error', this.onError);
	}

	wrapCallback(callback) {
		var s = this.socket;

		return function () {
			var args = arguments;
			callback.apply(s, args);
		};
	}

	onError = () => {
		console.log('socket: error');
	}

	onConnect = () => {
		console.log('socket: connected');
	}

	onDisconnect = () => {
		console.log('socket: disconnected');
	}

	on<T>(eventName): Promise<T> {
		return new Promise<T>((resolve, reject) =>{
			this.socket.on(eventName, (data: T) =>{
				resolve(data);
			});
		});
	}

	off(eventName, callback) {
		this.socket.off(eventName, callback[this.originalFunctionKey]);
	}

	emit(eventName, data?, callback?) {
		this.socket.emit(eventName, data, () => {
			if (callback){
				callback();
			}
		});
	}
}