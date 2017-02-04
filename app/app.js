var chatsApp = angular.module('ewdApp', ['ngRoute','ngclipboard','headroom','checklist-model','angularytics']);


chatsApp.config(['$routeProvider','$locationProvider','AngularyticsProvider', function($routeProvider, $locationProvider, AngularyticsProvider){

  $locationProvider.html5Mode(true);

  AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);

  $routeProvider
    .when('/', {
      templateUrl:'views/chats.html',
      controller:'mainCtrl'
    })
    .when('/trouble-shoot-helps', {
      templateUrl:'views/trouble-shoot.html',
      controller:'shootCtrl'
    })
    .when('/suggestion', {
      templateUrl:'views/suggestion.html',
      controller:'mainCtrl'
    }).otherwise({
      redirectTo:'/'
    });

}]);

chatsApp.run(function(Angularytics) {
  Angularytics.init();
});

chatsApp.controller('mainCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

  $http.get('data/chats.json').success(function(Data){
    $scope.chats = Data;
  });

  $scope.categoryIncludes = [];
  $scope.includeCategory = function(category) {
    var i = $.inArray(category, $scope.categoryIncludes);
    if (i > -1) {
        $scope.categoryIncludes.splice(i, 1);
    } else {
        $scope.categoryIncludes.push(category);
    }
  };
  $scope.categoryFilter = function(chats) {
    if ($scope.categoryIncludes.length > 0) {
        if ($.inArray(chats.category, $scope.categoryIncludes) < 0)
            return;
    }
    return chats;
  };

  //checkbox properties
  $scope.chatCats = [
    {
      name: 'hellos',
      shortName: 'hellos'
    },
    {
      name: 'Service Referrals - VAS',
      shortName: 'ServiceReferrals-VAS'
    },
    {
      name: 'bells of churn',
      shortName: 'bellsofchurn'
    },
    {
      name: 'reports',
      shortName: 'reports'
    },
    {
      name: 'navigation',
      shortName: 'navigation'
    },
    {
      name: 'cache and cookies',
      shortName: 'cacheandcookies'
    },
    {
      name: 'bye',
      shortName: 'bye'
    },
    {
      name: 'api',
      shortName: 'api'
    },
    {
      name: 'idle messages',
      shortName: 'idlemessages'
    },
    {
      name: 'Reset Password',
      shortName: 'ResetPassword'
    },
    {
      name: 'CAS ID Reset',
      shortName: 'CASIDReset'
    },
    {
      name: 'Merge Duplicates',
      shortName: 'MergeDuplicates'
    },
    {
      name: 'purchase contacts',
      shortName: 'purchasecontacts'
    },
    {
      name: 'email compliance',
      shortName: 'emailcompliance'
    }
  ];

  $scope.chatCatsSelected = {
    name: []
  };

  $scope.uncheckAll = function() {
    $scope.chatCatsSelected.name = [];
  };

  $scope.meAlert = {
    message: '',
    show: false,
    useCloseBtn: true,
    toggle: function(mess) {
      this.useCloseBtn=true
      if(this.show) {
        this.show = false
      }else {
        this.show = true
        this.message = mess
      }
    },
    autoClose: function(mess, delay, closeBtn) {
      if(closeBtn) {
        this.useCloseBtn=true
      }else {
        this.useCloseBtn=false
      }
      if(this.show) {
        this.show = false
      }else {
        this.show = true
        this.message = mess
        function closeAlert() {
          $scope.meAlert.show = false
        }
        $timeout(closeAlert, delay, this)
      }
    }
  }

}]);

chatsApp.controller('shootCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

  $http.get('data/shoot.json').success(function(Data){
    $scope.shoots = Data;
  });

  //filter by checkboxes
  $scope.categoryIncludes = [];
  $scope.includeCategory = function(category) {
    var i = $.inArray(category, $scope.categoryIncludes);
    if (i > -1) {
        $scope.categoryIncludes.splice(i, 1);
    } else {
        $scope.categoryIncludes.push(category);
    }
  };
  $scope.categoryFilter = function(shoots) {
    if ($scope.categoryIncludes.length > 0) {
        if ($.inArray(shoots.category, $scope.categoryIncludes) < 0)
            return;
    }
    return shoots;
  };

  //checkbox properties
  $scope.shootCats = [
    {
      name: 'campaign',
      shortName: 'campaign'
    },
    {
      name: 'app slowness',
      shortName: 'appSlowness'
    },
    {
      name: 'api helps',
      shortName: 'apiHelps'
    },
    {
      name: 'category2',
      shortName: 'category2'
    }
  ];

  $scope.shootCatsSelected = {
    name: []
  };

  $scope.uncheckAll = function() {
    $scope.shootCatsSelected.name = [];
  };

  $scope.meAlert = {
    message: 'this is such a test!',
    show: false,
    useCloseBtn: true,
    toggle: function(mess) {
      this.useCloseBtn=true
      if(this.show) {
        this.show = false
      }else {
        this.show = true
        this.message = mess
      }
    },
    autoClose: function(mess, delay, closeBtn) {
      if(closeBtn) {
        this.useCloseBtn=true
      }else {
        this.useCloseBtn=false
      }
      if(this.show) {
        this.show = false
      }else {
        this.show = true
        this.message = mess
        function closeAlert() {
          $scope.meAlert.show = false
        }
        $timeout(closeAlert, delay, this)
      }
    }
  }

}]);
