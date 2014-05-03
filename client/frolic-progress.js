(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('frolicProgress', []).directive('progressbar', function() {
    var dir;
    dir = {
      restrict: "E",
      template: "<div class='chevrons'>\n<ul class='chevrons'>\n<li ng-click=\"operationClicked(step)\" ng-class='step.status' ng-repeat='step in _steps'><span><a href=\"#\" ng-bind=\"step.title\"/></span></li>\n					 </ul></div>",
      replace: true,
      scope: {
        _steps: "=steps",
        _state: "=state"
      },
      link: function(scope, element) {
        var bar;
        bar = angular.element(element.children());
        return scope.operationClicked = function(step) {
          return scope.$emit('progress:step:clicked', step);
        };
      }
    };
    return dir;
  }).factory('ProgressSteps', function() {
    var ProgressSteps;
    return ProgressSteps = (function() {
      function ProgressSteps() {
        this.all = [];
      }

      ProgressSteps.prototype.add = function(operation, title) {
        return this.all.push({
          operation: operation,
          title: title,
          status: null
        });
      };

      ProgressSteps.prototype.inprogress = function(operation) {
        return this.updateStatus(operation, 'inprogress');
      };

      ProgressSteps.prototype.failure = function(operation) {
        return this.updateStatus(operation, 'failure');
      };

      ProgressSteps.prototype.success = function(operation) {
        return this.updateStatus(operation, 'success');
      };

      ProgressSteps.prototype.reset = function(operation) {
        return this.updateStatus(operation, null);
      };

      ProgressSteps.prototype.resetAll = function() {
        var step, _i, _len, _ref, _results;
        _ref = this.all;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          step = _ref[_i];
          _results.push(step.status = null);
        }
        return _results;
      };

      ProgressSteps.prototype.hasStatus = function() {
        this.all.forEach(function(step) {
          if (step.status !== null && step.status !== void 0) {
            return true;
          }
        });
        return false;
      };

      ProgressSteps.prototype.updateStatus = function(operation, status) {
        var step, _i, _len, _ref, _results;
        _ref = this.all;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          step = _ref[_i];
          if (step.operation === operation) {
            _results.push(step.status = status);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return ProgressSteps;

    })();
  }).factory('EaselProgressSteps', function(ProgressSteps) {
    var EaselProgressSteps;
    return EaselProgressSteps = (function(_super) {
      __extends(EaselProgressSteps, _super);

      function EaselProgressSteps($scope) {
        EaselProgressSteps.__super__.constructor.call(this);
        this.add('query', 'Query');
        this.add('transform', 'Transform');
        this.add('visualize', 'Visualize');
      }

      return EaselProgressSteps;

    })(ProgressSteps);
  }).factory('easelProgressSteps', function(EaselProgressSteps) {
    return new EaselProgressSteps();
  });

}).call(this);
