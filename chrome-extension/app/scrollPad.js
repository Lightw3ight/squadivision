(() => {
	function factory($parse) {
		var directive = {
			restrict: 'E',
			templateUrl: 'scrollPad.html',
			link: link
		}
		
		function link(scope, element, attrs){
			var fn = $parse(attrs.onScroll)
			element.on('mousewheel', (args =>{
				fn(scope, { direction: args.wheelDelta < 0 ? 1 : -1 });
				//console.log(`scroll: ${args.wheelDelta}, ${args.detail}`)
			}))
		}
		
		return directive;
	}
	
	angular
		.module('app')
		.directive('scrollPad', factory);
})();