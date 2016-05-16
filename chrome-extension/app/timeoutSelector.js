(() => {
	class TimeoutSelector {
		constructor() {
			this.timeouts = [15, 30, 60, 120];
		}
		
		changeTimeout(timeout){
			this.onTimeoutChanged({timeout: timeout});
		}
	}

	angular.module('app').component('timeoutSelector', {
		templateUrl: '/templates/timeout-selector.html',
		controller: factory,
		bindings: {
			onTimeoutChanged: '&',
			selectedTimeout: '<'
		}
	});

	function factory() {
		return new TimeoutSelector();
	}
})();