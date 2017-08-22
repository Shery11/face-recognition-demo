app.controller('cameraCtrl', ['$scope', function ($scope) {
	console.log('camera Controller initialized');

	/*detect a face with the help of camera*/
	$scope.detectFaceThroughCamera = () => {
		let videoInput = document.getElementById('inputVideo');
		let canvasInput = document.getElementById('inputCanvas');
		let htracker = new headtrackr.Tracker();
		htracker.init(videoInput, canvasInput);
		htracker.start();	
	}

}]);