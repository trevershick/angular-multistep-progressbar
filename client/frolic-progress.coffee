angular.module 'frolicProgress', []
	.directive 'progressbar', ()->
		dir=
			restrict: "E",
			template: """<div class='chevrons'>
						<ul class='chevrons'>
						<li ng-click="operationClicked(step)" ng-class='step.status' ng-repeat='step in _steps'><span><a href="#" ng-bind="step.title"/></span></li>
					 </ul></div>"""
			replace: true
			scope:
				_steps: "=steps"
				_state: "=state"

			link: (scope, element) ->
				bar = angular.element(element.children())
				scope.operationClicked = (step) ->
					scope.$emit 'progress:step:clicked', step
		dir
	.factory 'ProgressSteps', ()->
		class ProgressSteps
			constructor: ()->
				@all = []
			add : (operation, title) ->
				@all.push { operation:operation, title:title, status:null }
			inprogress : (operation) ->
				@updateStatus operation, 'inprogress'
			failure : (operation) ->
				@updateStatus operation, 'failure'
			success : (operation) ->
				@updateStatus operation, 'success'
			reset : (operation) ->
				@updateStatus operation, null
			resetAll: ()->
				for step in @all 
					step.status = null
			hasStatus: ()->
				@all.forEach (step)->
					if step.status != null and step.status != undefined
						return true
				false
			updateStatus : (operation, status) ->
				for step in @all
					if step.operation == operation
						step.status = status
	.factory 'EaselProgressSteps', (ProgressSteps)->
		class EaselProgressSteps extends ProgressSteps
			constructor: ($scope)->
				super()
				@add('query','Query')
				@add('transform','Transform')
				@add('visualize','Visualize')
	.factory 'easelProgressSteps', (EaselProgressSteps)->
		new EaselProgressSteps()
