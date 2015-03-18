<style>
.dropImg{
max-width: 120px;
border-collapse: collapse;
}
</style>
<script>
var app = angular.module('myApp',['directives.dragdrop']);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  });

app.controller('dropImg', function($scope) {
	$scope.items = 'default.png';
	
});
</script>
<div ng-app="myApp" ng-controller="dropImg">
<img class="dropImg" drop-target="true" src="[[items]]" err-src="error.png" ng-model = "items" />
<!-- 使用 drop-target="true"  -->

</div>
