var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');

		$routeProvider
		.when('/', {
			templateUrl: '/views/home.html',
			controller: 'faceListCtrl'
		})
		.when('/face/edit/:id',{
			templateUrl:'views/editFace.html',
			controller:'faceListCtrl'
		})
		.when('/addFace', {
			templateUrl: 'views/addFace.html',
			controller: 'faceListCtrl'
		})
		.when('/find', {
			templateUrl: 'views/findSimilar.html',
			controller: 'faceListCtrl'
		})
		.when('/faces', {
			templateUrl: 'views/faces.html',
			controller: 'faceListCtrl'
		})
		.when('/detectThroughCamera', {
			templateUrl: 'views/detectThroughCamera.html',
			controller: 'cameraCtrl'
		})
		.otherwise({ redirectTo: '/' });
});