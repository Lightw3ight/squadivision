import angular from 'angular';
import hostController from './hostController';
import screenController from './screenController';
import socketService from './socketService';

angular.module('app',[
	hostController.name,
	socketService.name,
	screenController.name
]);

angular.element(document).ready(() =>{
	angular.bootstrap(document, ['app']);
});