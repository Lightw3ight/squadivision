class PopupController {
	constructor($scope, socketService, configService, $timeout) {
		this.$timeout = $timeout;
		this.configKey = 'squadivision-monitor-config';
		this.configService = configService;
		this.socketService = socketService;
		this.config = this.configService.getConfig();
		this.backgroundPort = chrome.extension.connect({ name: "Background Communication port" });
	}

	showConfig() {
		this.configClone = angular.copy(this.config);
		this.configOpen = true;
	}

	saveConfig() {
		this.configService.saveConfig(angular.copy(this.config));
		this.$timeout(() =>{
			this.backgroundPort.postMessage(angular.copy(this.config));
			window.close();
		}, 300);
		// port.onMessage.addListener(function (msg) {
		// 	console.log("message recieved" + msg);
		// });

	}
}

angular.module('app').controller('popupController', PopupController);