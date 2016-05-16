(() => {
	class ConfigPanel {
		constructor(settingsService) {
			this.settingsService = settingsService;
			this.loadSettings();
		}
		
		save(){
			this.settingsService.set(this.settings);
			this.onSettingsSaved({settings: this.settings});
			this.close();
		}
		
		close(){
			this.loadSettings();
			this.onClose();
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
		controller: factory,
		bindings: {
			onSettingsSaved: '&',
			onClose: '&',
		}
	});

	function factory(settingsService) {
		return new ConfigPanel(settingsService);
	}
})();