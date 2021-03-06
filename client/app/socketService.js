
import io from 'socket.io-client';

export class SocketService {
	constructor($rootScope, $timeout) {
		var _self = this;
		this.originalFunctionKey = '__socketCallBack';
		this.socketServerUrl = 'http://localhost:3000';
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;

		//this.socket = io(this.socketServerUrl, { query: `memberId=1`, secure: true });


	}

	connect(query) {
		let _self = this;
		_self.socket = io(_self.socketServerUrl, { query: query });

		_self.socket.connect();
		_self.socket.on('connect', _self.onConnect);
		_self.socket.on('disconnect', _self.onDisconnect);
		_self.socket.on('error', _self.onError);
	}

	wrapCallback(callback) {
		var t = this.$timeout;
		var s = this.socket;

		return function() {
			var args = arguments;
			t(() => {
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
		this.socket.emit(eventName, data, (a, b, c) => {
			var a = b;
		});
	}
}

export default angular.module('app.common.SocketService', []).service('socketService', SocketService);