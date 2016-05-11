(() => {
	class SettingsService {
		constructor() {
			this.key = 'squadivision-client-config';
		}

		get() {
			return JSON.parse(localStorage.getItem(this.key));
		}

		set(settings) {
			localStorage.setItem(this.key, JSON.stringify(settings))
		}
	}

	function factory() {
		return new SettingsService();
	}

	angular.module('app').service('settingsService', factory);
})();