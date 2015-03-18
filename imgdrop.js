var module = angular.module("directives.dragdrop",[]);

module.directive('dropTarget', ['$parse',  function($parse) {
	
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, el, attrs, controller) {
        	var model = $parse(attrs.ngModel);
            var modelSetter = model.assign;
        	el.bind("dragover", function(e) {
        		 
	              if (e.preventDefault) {
	                e.preventDefault(); 
	              }
	              
	              e.dataTransfer.dropEffect = 'move'; 
	              return false;
	            });
	            
	            el.bind("dragenter", function(e) {
	              // this / e.target is the current hover target.
	              angular.element(e.target).addClass('over');
	            });
	            
	            el.bind("dragleave", function(e) {
	              angular.element(e.target).removeClass('over'); 
	            });
            
            el.bind("drop", function(e) {
            	
              if (e.preventDefault) {
                e.preventDefault(); 
              }

              if (e.stopPropogation) {
                e.stopPropogation();
              }
              
              var files = e.dataTransfer.files;
          	  if (files.length > 0 ){
	          		var file = files[0];
	          		var reader = new FileReader();
	          		reader.onloadend = function(evt){
	          			scope.$apply(function(){
	                        modelSetter(scope, evt.target.result);
	                    });
	          		};
	          		reader.readAsDataURL(file);	
          	  }
          	  else{
          		var data = e.dataTransfer.getData("text");
            	scope.$apply(function(){
                    modelSetter(scope, data);
                });  
          	  }
            	
            });

            
        }
	}
}]);
