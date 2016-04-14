class PopupController {
	constructor($scope, socketService, localStorageService) {
		this.localStorageService = localStorageService;
		this.socketService = socketService;
		this.config = localStorageService.get('squadivision-client-config') || {};
		
		if (this.config.serverUrl){
			this.connectToServer();
		} else {
			this.showConfig();
		}
		
		this.getCurrentTabUrl(url => {
			this.currentUrl = url;
			$scope.$apply();
		});

	}
	
	showConfig(){
		this.configClone = angular.copy(this.config);
		this.configOpen = true;
	}
	
	saveConfig(){
		this.config = this.configClone;
		this.localStorageService.set('squadivision-client-config', this.config);
		this.connectToServer();
		this.configOpen = false;
	}
	
	connectToServer(){
		this.socketService.connect(this.config.serverUrl);
		this.loadMonitors();
	}

	loadMonitors() {
		this.socketService.on('monitor-list', monitors => {
			this.monitors = monitors;
			this.selectedMonitor = this.monitors[0];
		});
		this.socketService.emit('get-monitors', {}, (a, b, c) => {
			//this.debug = JSON.stringify(a);
		});
	}

	sendToMonitor(url, monitorId) {
		chrome.cookies.getAll({ url: url }, (bikkies) => {
			this.socketService.emit('url', { url: url, monitorId: monitorId, cookies: bikkies }, (a, b, c) => {
				window.close();
			});
		});

	}

	getCurrentTabUrl(callback) {
		// Query filter to be passed to chrome.tabs.query - see
		// https://developer.chrome.com/extensions/tabs#method-query
		var queryInfo = {
			active: true,
			currentWindow: true
		};

		chrome.tabs.query(queryInfo, function(tabs) {
			// chrome.tabs.query invokes the callback with a list of tabs that match the
			// query. When the popup is opened, there is certainly a window and at least
			// one tab, so we can safely assume that |tabs| is a non-empty array.
			// A window can only have one active tab at a time, so the array consists of
			// exactly one tab.
			var tab = tabs[0];

			// A tab is a plain object that provides information about the tab.
			// See https://developer.chrome.com/extensions/tabs#type-Tab
			var url = tab.url;

			// tab.url is only available if the "activeTab" permission is declared.
			// If you want to see the URL of other tabs (e.g. after removing active:true
			// from |queryInfo|), then the "tabs" permission is required to see their
			// "url" properties.
			console.assert(typeof url == 'string', 'tab.url should be a string');

			callback(url);
		});
	}
}

angular.module('app').controller('popupController', PopupController);