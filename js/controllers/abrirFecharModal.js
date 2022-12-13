angular.module("ahpFuzzy").controller('abrirFecharModal', function($scope, $modal){
    
    //Abrindo o modal informações 
    $scope.abrirModalInformacoes = function(p) {
        $modal.open({
          templateUrl: 'view/modalInformacoes.html',
          backdrop: true,
          windowClass: 'modal',
          controller: function($scope, $modalInstance) {
            $scope.fechar = function() {
              $modalInstance.dismiss('cancel');
            };
          },
        });
      };

});