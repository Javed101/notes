
(function(){
var app = angular.module('mynotes', ['ionic', 'mynotes.notestore']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('list', {
    url:'/list',
    templateUrl:'templates/list.html'
  });
  $stateProvider.state('add', {
    url:'/add',
    templateUrl:'templates/edit.html',
    controller:'AddCtrl'
  });
  $stateProvider.state('edit', {
    url:'/edit/:noteId',
    templateUrl:'templates/edit.html',
    controller:'EditCtrl'
  });
  $urlRouterProvider.otherwise('/list');
});

app.controller('ListCtrl', function($scope,NoteStore){
  $scope.notes = NoteStore.list();
  $scope.reordering = false;
  $scope.remove = function(noteId){
    NoteStore.remove(noteId);
  };
  $scope.move = function(note,fromIndex,toIndex){
    NoteStore.move(note,fromIndex,toIndex);
  };
  $scope.toggleReordering = function(){
    $scope.reordering = !$scope.reordering;
  };
});

app.controller('AddCtrl', function($scope, $state, NoteStore){
      $scope.note = {
        id:new Date().getTime().toString(),
        title:'',
        description:''
      };
      $scope.save = function() {
       NoteStore.create($scope.note);
       $state.go('list');
     };
});

app.controller('EditCtrl', function($scope, $state,NoteStore){
      $scope.note = angular.copy(NoteStore.get($state.params.noteId));

     $scope.save = function() {
       NoteStore.update($scope.note);
       $state.go('list');
     } ;
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
}());
