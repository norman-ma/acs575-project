const app = angular.module('DashboardApp', ['ngSanitize', 'ngRoute'])

app.config(($routeProvider) => {
    $routeProvider
       .when("/",{
           templateUrl: '/templates/index.htm'
       })
})

app.controller('HomeController', ['$scope', ($scope) => {}])

app.controller('QueryController', ['$scope', '$http', ($scope, $http) => {}])