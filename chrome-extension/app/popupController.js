(() => {
	class PopupController {
		constructor($scope, socketService, settingsService) {
			this.settingsService = settingsService;
			this.socketService = socketService;
			this.config = settingsService.get() || {};

			if (this.config.serverUrl) {
				this.connectToServer();
			} else {
				this.showConfig();
			}
		}

		broadcast(value, timeout, monitorId) {
			timeout = timeout || (value.type === 'giphy' ? 15 : null);
			this.sendToMonitor(value.url, monitorId, timeout);
		}

		showConfig() {
			this.configOpen = true;
		}

		scrollMonitor(direction) {
			this.socketService.emit('scroll', { direction: direction, monitorId: this.selectedMonitor })
		}

		updateSettings(settings) {
			this.config = settings;
			this.connectToServer();
		}

		connectToServer() {
			this.socketService.connect(this.config.serverUrl);
			//this.loadMonitors();
		}

		// loadMonitors() {
		// 	this.socketService.on('monitor-list', monitors => {
		// 		this.monitors = monitors;
		// 		this.selectedMonitor = this.monitors[0];
		// 	});
		// 	this.socketService.emit('get-monitors', {}, (a, b, c) => {
		// 		//this.debug = JSON.stringify(a);
		// 	});
		// }

		sendToMonitor(url, monitorId, timeout) {
			chrome.cookies.getAll({ url: url }, (bikkies) => {
				this.socketService.emit('url', { url: url, monitorId: monitorId, cookies: bikkies, timeout: timeout }, (a, b, c) => {
					window.close();
				});
			});
		}
	}
	
	angular.module('app').component('popup', {
		templateUrl: '/templates/popup.html',
		controller: factory
	});

	function factory($scope, socketService, settingsService) {
		return new PopupController($scope, socketService, settingsService);
	}
})();