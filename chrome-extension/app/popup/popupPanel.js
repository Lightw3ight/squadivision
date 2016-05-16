(() => {
	class PopupPanel {
		constructor($scope, $location, socketService, settingsService) {
			this.$location = $location;
			this.settingsService = settingsService;
			this.socketService = socketService;
			this.config = settingsService.get() || {};

			if (this.config.serverUrl) {
				this.connectToServer();
			} else {
				this.$location.path('/config');
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
		}

		sendToMonitor(url, monitorId, timeout) {
			chrome.cookies.getAll({ url: url }, (bikkies) => {
				this.socketService.emit('url', { url: url, monitorId: monitorId, cookies: bikkies, timeout: timeout }, (a, b, c) => {
					window.close();
				});
			});
		}
	}
	
	angular.module('app').component('popupPanel', {
		templateUrl: '/templates/popup.html',
		controller: factory
	});

	function factory($scope, $location, socketService, settingsService) {
		return new PopupPanel($scope, $location, socketService, settingsService);
	}
})();