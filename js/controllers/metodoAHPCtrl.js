angular.module("ahpFuzzy").controller("metodoAHPCtrl", function($scope){


    $scope.matrizDePesoImpacInteExt = []; 
    $scope.matrizDePesoFreqEQtAp = []; 
    $scope.matrizDePesoImpactEPesq = []; 


    $scope.metodoAHP = function(){
        console.log("FUNCIONOU");
        //Inicializando os valores das matrizes de peso Impactor interno e externo
        $scope.matrizDePesoImpacInteExt[0] = 1/6; 
        $scope.matrizDePesoImpacInteExt[1] = 5/6; 


        //Inicializando os valores das matrizes de peso FrequÊncia de Menção e Qunatidade de Apresentação
        $scope.matrizDePesoFreqEQtAp[0] = 5/6; 
        $scope.matrizDePesoFreqEQtAp[1] = 1/6; 


        //Inicializando os valores das matrizes de peso Impacto e Pesquisa
        $scope.matrizDePesoImpactEPesq[0] = 7/8; 
        $scope.matrizDePesoImpactEPesq[1] = 1/8; 
    }

    
});