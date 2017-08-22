
app.controller('faceListCtrl', ['$scope', '$http','$route','$timeout', function ($scope, $http,$route,$timeout) {
	console.log('faceList controller');

	$scope.show = false;
	$scope.bar = false;

	/*Show all faces*/
	$scope.getFaces = () => {
		$http.get('/api/faces').then(response => {
			// console.log(response.data);
			$scope.faces = response.data;
			// console.log($scope.faces)
		})
	}
	/*add a face to a face list*/
	$scope.addFace = () => {
		$scope.bar = true;
		$scope.data = {
			link: $scope.link,
			facelist_id: $scope.faceListId,
			name: $scope.name,
			imgUrl: $scope.link
		};
		$http.post('/api/faces/', $scope.data).then(response => {
			console.log(response.data.face_id);
			$route.reload();
		});
	}
	/*find a similar faces in the given face list*/
	$scope.findSimilar = () => {
		$scope.bar = true;
		$scope.data = {
			link : $scope.link,
			faceList_id: $scope.faceListId
		 };
		$http.post('/api/faces/find', $scope.data).then( response => {
			console.log(response);
		    if(response.data.success){ 
		    	$scope.bar = false;
		        $scope.success = "Face found";          
		    	
		    	$scope.data = response.data.message;
		    	$scope.show = true;
		    }else{
		    	$scope.bar = false;
               $scope.success = "Sorry no face found";
               $timeout(function() {
               	 $route.reload(); 
               }, 3000);

		    }
		});
	}
	/*Delete a face from a face list*/
	$scope.deleteFace = (id) => {
		console.log("inside deleteFace");
		console.log(id);
		$http.delete('/api/faces/'+id).then(response =>{
			console.log(response.data);
		})
	}
	

}]);

