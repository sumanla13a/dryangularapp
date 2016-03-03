angular.module('account.project', ['ngRoute', 'security.authorization', 'services.projects', 'services.accountResource']);
angular.module('account.project').config(['$routeProvider', 'securityAuthorizationProvider', function($routeProvider, securityAuthorizationProvider){
  $routeProvider
    .when('/account/create_project', {
      templateUrl: 'account/account_create_project/account-create-project.tpl.html',
      controller: 'CreateProjectCtrl',
      title: 'Create Project',
      resolve: {
        authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
      }
    });
}]);
angular.module('account.project').controller('CreateProjectCtrl', [ '$scope', 'projectResource', 'accountResource',
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
      if($scope.createProjectForm.$valid) {

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
      }
    };
  }]);
