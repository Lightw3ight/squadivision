(() => {
	class ConfigPanel {
		constructor($location, settingsService, socketService) {
			this.$location = $location;
			this.socketService = socketService;
			this.settingsService = settingsService;
			this.loadSettings();
		}
		
		save(){
			this.settingsService.set(this.settings);
			this.socketService.disconnect();
			this.$location.path('/');
		}
		
		canClose(){
			return !!this.activeSettings.serverUrl
		}
		
		loadSettings(){
			this.activeSettings = this.settingsService.get() || {};
			this.settings = angular.copy(this.activeSettings);
		}
	}

	angular.module('app').component('configPanel', {
		templateUrl: '/templates/config-panel.html',
		controller: factory
	});

	function factory($location, settingsService, socketService) {
		return new ConfigPanel($location, settingsService, socketService);
	}
})();