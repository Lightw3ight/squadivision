(() => {
	class PopupPanel {
		constructor($scope, socketService, settingsService, $timeout) {
			this.$timeout = $timeout;
			this.configKey = 'squadivision-monitor-config';
			this.settingsService = settingsService;
			this.socketService = socketService;
			this.config = this.settingsService.get();
			this.backgroundPort = chrome.extension.connect({ name: "Background Communication port" });
		}

		showConfig() {
			this.configClone = angular.copy(this.config);
			this.configOpen = true;
		}

		saveConfig() {
			this.settingsService.save(angular.copy(this.config));
			this.$timeout(() => {
				this.backgroundPort.postMessage(angular.copy(this.config));
				window.close();
			}, 300);
		}
	}

	angular.module('app').component('popupPanel', {
		templateUrl: '/templates/popup-panel.html',
		controller: factory
	});

	function factory($scope, socketService, settingsService, $timeout) {
		return new PopupPanel($scope, socketService, settingsService, $timeout);
	}
})();
