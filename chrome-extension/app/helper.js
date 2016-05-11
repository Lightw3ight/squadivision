function createClassFactory(componentClass) {
	function fn() {
		return new (Function.prototype.bind.apply(componentClass, arguments))();
	}

	fn.$inject = angular.injector.$$annotate(componentClass);
	return fn;
}