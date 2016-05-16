(() => {
	class ScrollPad{
		constructor($element){
			$element.on('mousewheel', (args =>{
				this.onScroll({ direction: args.wheelDelta < 0 ? 1 : -1 });
			}))
		}
	}
	
	angular.module('app').component('scrollPad', {
		templateUrl: '/templates/scroll-pad.html',
		controller: factory,
		bindings: {
			onScroll: '&',
		}
	});
	
	function factory($element) {
		return new ScrollPad($element);
	}	
})();