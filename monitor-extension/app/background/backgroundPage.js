(() => {
	class BackgroundController {
		constructor($scope, socketService, $sce, settingsService) {
			this.$sce = $sce;
			this.socketService = socketService;
			this.settingsService = settingsService;
			this.config = settingsService.get() || {};
			this.timeout = null;
			this.previousUrl = null;

			if (this.config.monitorName && this.config.serverUrl) {
				this.connectToSocketServer();
			}

			this.getTab(tab => {
				var thing = tab;
			})

			chrome.extension.onConnect.addListener(port => {
				console.log("Connected to popup");
				port.onMessage.addListener(config => {
					this.config = config;
					if (this.config.monitorName && this.config.serverUrl) {
						console.log("Config updated");
						this.connectToSocketServer();
					}
				});
			});
		}

		connectToSocketServer() {
			console.log('conecting');
			this.socketService.connect(this.config.serverUrl, { monitorId: `${this.config.monitorName}` });
			this.socketService.on('url', (data) => { this.onEventReceived(data); });
			this.socketService.on('scroll', (data) => { this.onScrollReceived(data); });
		}

		onScrollReceived(data) {
			console.log('got scroll event');
			this.getTab(tab => {
				chrome.tabs.executeScript(tab.id, { code: `window.scrollBy(0, ${data.direction} * 120);` });
			})
		}

		onEventReceived(data) {
			if (data.timeout) {
				this.getTab(tab => {
					if (this.timeout) {
						window.clearTimeout(this.timeout);
					} else {
						this.previousUrl = tab.url
					}

					this.setNewUrl(data.url, data.cookies);

					this.timeout = window.setTimeout(() => {
						this.setNewUrl(this.previousUrl, []);
						this.previousUrl = null;
						this.timeout = null;
					}, data.timeout * 1000);
				})
			} else {
				this.setNewUrl(data.url, data.cookies);
			}
		}

		setNewUrl(url, cookies) {
			var thing = cookies;
			var queryInfo = {
				active: true,
				windowType: "normal",
				//currentWindow: true,
				lastFocusedWindow: true
			};

			cookies.forEach(c => {
				chrome.cookies.set(
					{
						url: url,
						name: c.name,
						domain: c.domain,
						value: c.value,
						path: c.path,
						secure: c.secure,
						httpOnly: c.httpOnly,
						expirationDate: c.expirationDate
					}, newCookie => {
						if (!newCookie) {
							console.log(`Error setting cookie: ${c.name} for ${domain}`);
						}
					});
			});

			// var onLoad = (tabId, info) => {
			// 	if (tabId == tab.id && info.status == "complete") {
			// 		chrome.tabs.onUpdated.removeListener(onLoad);
			// 		cookies.forEach(c => {
			// 			chrome.cookies.remove({
			// 				name: c.name,
			// 				url: url
			// 			});
			// 		});
			// 	}
			// }

			this.getTab(tab => {
				chrome.tabs.update(tab.id, { url: url });
			})

			// chrome.tabs.query(queryInfo, (tabs) => {
			// 	var tab = tabs[0];
			// 	chrome.tabs.update(tab.id, { url: url });
			// 	//chrome.tabs.onUpdated.addListener(onLoad);
			// });
		}

		getTab(callback) {
			var queryInfo = {
				active: true,
				windowType: "normal",
				//currentWindow: true,
				lastFocusedWindow: true
			};

			chrome.tabs.query(queryInfo, (tabs) => {
				var tab = tabs[0];
				callback(tab);
				//chrome.tabs.onUpdated.addListener(onLoad);
			});
		}
	}

	function factory($scope, socketService, $sce, settingsService) {
		return new BackgroundController($scope, socketService, $sce, settingsService);
	}

	angular.module('app').component('backgroundPage', {
		template: '<div>Squadivision: Monitor background page.</div>',
		controller: factory
	});
})();
