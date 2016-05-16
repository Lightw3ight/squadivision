(() => {
	class ScreenSelector {
		constructor(settingsService, socketService) {
			this.settingsService = settingsService;
			this.socketService = socketService;
			this.config = settingsService.get() || {};

			this.loadScreens();
		}

		loadScreens() {
			this.config = this.settingsService.get() || {};
			
			if (!this.config.serverUrl) {
				return;
			}

			this.socketService.connect(this.config.serverUrl);

			this.socketService.on('monitor-list', screens => {
				this.screens = screens;
				
				if (this.config.lastScreen && screens.indexOf(this.config.lastScreen) >= 0){
					this.changeScreen(this.config.lastScreen);
				}
				else if (!this.selectedScreen && screens.length > 0){
					this.changeScreen(this.screens[0]);
				}
			});

			this.socketService.emit('get-monitors', {}, (a, b, c) => {
				//this.debug = JSON.stringify(a);
			});
		}
		
		changeScreen(screen){
			this.config = this.settingsService.get() || {};
			this.config.lastScreen = screen;
			this.settingsService.set(this.config);
			this.onScreenChanged({screen: screen});
		}
	}

	angular.module('app').component('screenSelector', {
		templateUrl: '/templates/screen-selector.html',
		controller: factory,
		bindings: {
			onScreenChanged: '&',
			selectedScreen: '<'
		}
	});

	function factory(settingsService, socketService) {
		return new ScreenSelector(settingsService, socketService);
	}
})();