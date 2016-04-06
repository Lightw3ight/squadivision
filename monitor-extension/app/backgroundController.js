class BackgroundController {
	constructor($scope, socketService, $sce) {
		this.$sce = $sce;
		this.socketService = socketService;
		socketService.connect();
		// this.getCurrentTabUrl(url => {
		// 	this.currentUrl = url;
		// 	$scope.$apply();
		// });

		this.monitorId = "demo-background";

		this.connectToSocketServer();
	}

	connectToSocketServer() {
		console.log('conecting');
		this.socketService.connect({ monitorId: `${this.monitorId}` });
		this.socketService.on('url', (data) => { this.onEventReceived(data); });
	}

	onEventReceived(data) {
		this.setNewUrl(data.url, data.cookies);
		//this.currentUrl = this.$sce.trustAsResourceUrl(data.url);
		//console.log('blurgle event: ' + JSON.stringify(data));
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

		chrome.tabs.query(queryInfo, (tabs) => {
			var tab = tabs[0];
			chrome.tabs.update(tab.id, { url: url });
			//chrome.tabs.onUpdated.addListener(onLoad);
		});
	}
}

angular.module('app').controller('backgroundController', BackgroundController);