angular.module('MyApp',['frolicProgress'])
.controller('MyController',function($scope, easelProgressSteps, $timeout) {
	
	if (Array.prototype.random === undefined) {
		Array.prototype.random = function() {
			return this[Math.floor(Math.random() * this.length)];
		}
	}
	
	$scope.header = 'Progress Bar Example';
	$scope.steps = easelProgressSteps;
	$scope.originalSteps = _.cloneDeep(easelProgressSteps.all);
	
	$scope.random = false
	$scope.messages = []
	
	$scope.$watch('random', function(newvalue,oldvalue){
		$scope.maybeRandomise();
	});
	
	$scope.maybeRandomise = function () {
		if ($scope.random === true) {
			$scope.randomise();
		} else {
			$scope.steps.all = _.cloneDeep($scope.originalSteps);
		}
	};
	
	$scope.randomise = function() {
		var stati = ['failure','success',null,'inprogress']
		var titles = ['Query','Transform','Visualize'];
		
		$scope.steps.all.forEach(function(step) {
			step.status = stati.random();
			step.title = titles.random();
		});
		$timeout($scope.maybeRandomise, 500);
	}

	
	$scope.$on('progress:step:clicked', function(event, step) {
		$scope.messages.push(event);
		if (step.operation === 'query') {
			step.status = 'inprogress';
		} else if (step.operation === 'transform') {
			step.status = 'success';
		} else if (step.operation === 'visualize') {
			step.status = 'failure';
		}
	});
	
});
