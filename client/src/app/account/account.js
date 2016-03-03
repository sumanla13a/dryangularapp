angular.module('account.index', ['ngRoute', 'security.authorization', 'services.projects', 'services.accountResource']);
angular.module('account.index').config(['$routeProvider', 'securityAuthorizationProvider', function($routeProvider, securityAuthorizationProvider){
  $routeProvider
    .when('/account', {
      templateUrl: 'account/account.tpl.html',
      controller: 'AccountCtrl',
      title: 'Account Area',
      resolve: {
        authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
      }
    });
}]);
angular.module('account.index').controller('AccountCtrl', [ '$scope', 'projectResource', 'accountResource',
  function($scope, projectResource, accountResource){
    function getProjects() {
      projectResource.getProjects($scope.user._id).then(function(projectData) {
        $scope.userProjects = projectData;
      });
    }
    var newProject = {
      project_name: '',
      project_description: ''
    };
    $scope.newProject = angular.copy(newProject);
    accountResource.getAccountDetails().then(function(userData) {
      $scope.user = userData.user;
      getProjects();
    });
    $scope.createProject = function() {
      console.log($scope.user._id);
      var projectData = {
        user_id: $scope.user._id,
        project_name: $scope.newProject.project_name,
        project_description: $scope.newProject.project_description
      };
      projectResource.createProject(projectData, $scope.user._id).then(function(){
        console.log('success');
        getProjects();
        $scope.newProject = angular.copy(newProject);

      }, function(err) {
        console.log(err);
      });
    };
    $scope.dayOfYear = moment().format('DDD');
    $scope.dayOfMonth = moment().format('D');
    $scope.weekOfYear = moment().format('w');
    $scope.dayOfWeek = moment().format('d');
    $scope.weekYear = moment().format('gg');
    $scope.hourOfDay = moment().format('H');
  }]);
