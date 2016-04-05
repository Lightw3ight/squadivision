import angular from 'angular';
import io from 'socket.io-client';

class HostController {
	constructor(socketService, $sce) {
		this.socketService = socketService;
		this.$sce = $sce;

		var query = this.getQueryParams();
		this.monitorId = query.monitorId;

		if (this.monitorId) {
			this.connectToSocketServer();
		}
	}

	connectToSocketServer() {
		this.socketService.connect({ monitorId: `${this.monitorId}` });
		this.socketService.on('url', (data) => { this.onEventReceived(data); });

	}

	getQueryParams() {
		var match,
			pl = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function(s) { return decodeURIComponent(s.replace(pl, " ")); },
			query = window.location.search.substring(1);

		let urlParams = {};
		while (match = search.exec(query)) {
			urlParams[decode(match[1])] = decode(match[2]);
		}

		return urlParams;
	}

	onEventReceived(data) {

		this.currentUrl = this.$sce.trustAsResourceUrl(data.url);
		console.log('blurgle event: ' + JSON.stringify(data));
	}

	sendEvent(url) {

		this.socketService.emit('blurgle', { url: url });
	}
}

export default angular
	.module('app.hostController', [])
	.controller('hostController', HostController);
