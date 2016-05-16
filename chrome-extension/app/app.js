angular.module('app', [
	'ui.bootstrap',
	'ngRoute'
]).config(function($routeProvider) {
  $routeProvider.when('/', {
    template: '<popup-panel></popup-panel>'
  })
  .when('/config', {
	  template: '<config-panel></config-panel>'
  });
});