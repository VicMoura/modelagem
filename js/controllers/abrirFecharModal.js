angular.module("ahpFuzzy").controller('abrirFecharModal', function($scope, $modal){
   

    //Abrindo o modal informações 
    $scope.abrirModalInformacoes = function() {
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

      $scope.abrirModalExtensoes = function() {
        $modal.open({
          animation: true,
          templateUrl: 'view/modalInformacoesDasExtensoes.html',
          backdrop: true,
          windowClass: 'modal',
          controller: function($scope, $modalInstance) {
            $scope.fechar = function() {
              $modalInstance.dismiss('cancel');
            };
          },
        });

      };


    

      $scope.abrirModalDadosExtensoes = function(){
        $scope.fechar();
        $modal.open({
          templateUrl: 'view/modalDadosExtensoes.html',
          backdrop: true,
          windowClass: 'modal',
          controller: function($scope, $modalInstance) {
            $scope.fechar = function() {
              $modalInstance.dismiss('cancel');
            };
          },
        });
    }

    $scope.abrirModalErro = function(){
      $modal.open({
        templateUrl: 'view/modalErro.html',
        backdrop: true,
        windowClass: 'modal',
        controller: function($scope, $modalInstance) {
          $scope.fechar = function() {
            $modalInstance.dismiss('cancel');
          };
        },
      });
    }

    $scope.abrirModalResultado = function(){
      $modal.open({
        templateUrl: 'view/modalResultado.html',
        backdrop: true,
        windowClass: 'modal',
        controller: function($scope, $modalInstance) {
          $scope.fechar = function() {
            $modalInstance.dismiss('cancel');
          };
        },
      });
      
    }


      $scope.mostrar = false; 


      $scope.extensoesQt = [];
      $scope.extensoes = {};
    
  
      $scope.selectQuantidade = []; 
      $scope.quantidade = ["2", "3", "4", "5"];  
      

      $scope.criarExtensoes = function(){
        for(let i = 0; i<$scope.selectQuantidade.valor; i++){
          $scope.extensoes[i] = {};
          $scope.extensoes[i].id = i+1;
          $scope.extensoes[i].impactInterno = "";
          $scope.extensoes[i].impactExterno = "";
          $scope.extensoes[i].freqMencHonr = "";
          $scope.extensoes[i].qtApresentacao = "";
          $scope.extensoesQt[i] = $scope.extensoes[i];
      }
      }

      $scope.prosseguirExtensao = function(){

        let auxiliar = 0;

        for(i in $scope.extensoesQt){
          if($scope.extensoesQt[i].name != undefined){
            auxiliar+=1;
          }
        }
          

        if(auxiliar == $scope.selectQuantidade.valor){
          sessionStorage.userService = angular.toJson($scope.extensoesQt);
          $scope.fechar();
          $scope.abrirModalDadosExtensoes();
        }else{
          $scope.abrirModalErro();
        }
        
      };

      $scope.mostrarOuNaoImagem = function(){
         if(!$scope.mostrar){
             $scope.mostrar = true; 
         }else{
           $scope.mostrar = false; 
         }
       }

       $scope.restoreStateExtensoes = function(){
          $scope.extensoesQt = angular.fromJson(sessionStorage.userService);
       }
      
       $scope.saveStateExtensoes = function(simOuNao){
          sessionStorage.userService = angular.toJson($scope.extensoesQt);

          if(simOuNao){
            let auxiliar = 0;
            let auxiliar2 = 0;
            for(i in $scope.extensoesQt){
              auxiliar2++;
              if(($scope.extensoesQt[i].impactInterno !== "" && $scope.extensoesQt[i].impactInterno >= 0 ) && ($scope.extensoesQt[i].impactExterno !== "" && $scope.extensoesQt[i].impactExterno >= 0)
              && ($scope.extensoesQt[i].freqMencHonr !== "" && $scope.extensoesQt[i].freqMencHonr >= 0) && ($scope.extensoesQt[i].qtApresentacao !== "" && $scope.extensoesQt[i].qtApresentacao >= 0)){
                auxiliar+=1;
              }
            }

            if(auxiliar == auxiliar2){
              $scope.fechar();
              $scope.metodoAHP();
              $scope.abrirModalResultado();
            }else{
              $scope.abrirModalErro();
            }
          }
       }

    $scope.tabelaValores = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    $scope.matrizDePesoImpacInteExt = []; 
    $scope.matrizDePesoFreqEQtAp = []; 
    $scope.matrizDePesoImpactEPesq = []; 


    $scope.matrizComparacaoImpacInt = [];
    $scope.matrizComparacaoImpacExt = [];
    $scope.matrizComparacaoFreqMen = [];
    $scope.matrizComparacaoQtApr = [];

    $scope.matrizComparacaoImpacIntMediaLinhas = [];
    $scope.matrizComparacaoImpacExtMediaLinhas = [];
    $scope.matrizComparacaoFreqMenMediaLinhas = [];
    $scope.matrizComparacaoQtAprMediaLinhas = [];

    $scope.resultadoImpacIntEExtr = [];
    $scope.resultadoFreqEQt = [];
    $scope.resultadoPesqEImpac = [];
    
    $scope.resultado = [];
    $scope.resultado2 = [];
    $scope.resultadoFinal = [];

    $scope.auxiliarValor;


    $scope.valorColocado = function(valor){
        if(valor<=10){
          $scope.auxiliarValor = 1; 
        }else if(valor <=20){
          $scope.auxiliarValor = 2; 
        }else if(valor<=30){
          $scope.auxiliarValor = 3;
        }else if(valor<=40){
          $scope.auxiliarValor = 4;
        }else if(valor<=50){
          $scope.auxiliarValor = 5;
        }else if(valor<=60){
          $scope.auxiliarValor = 6;
        }else if(valor<=70){
          $scope.auxiliarValor = 7;
        }else if(valor<=80){
          $scope.auxiliarValor = 8;
        }else{
          $scope.auxiliarValor = 9;
        }

    }


    $scope.metodoAHP = function(){

        $scope.restoreStateExtensoes();

        //Inicializando os valores das matrizes de peso Impactor interno e externo
        $scope.matrizDePesoImpacInteExt[0] = 1/6; 
        $scope.matrizDePesoImpacInteExt[1] = 5/6; 

        console.log("MATRIZ DE PESO IMPACTO INTERNO E EXTERNO: ");
        console.table($scope.matrizDePesoImpacInteExt);
        console.log("-----------------------------------------------------------");

        //Inicializando os valores das matrizes de peso FrequÊncia de Menção e Qunatidade de Apresentação
        $scope.matrizDePesoFreqEQtAp[0] = 5/6; 
        $scope.matrizDePesoFreqEQtAp[1] = 1/6; 

        console.log("MATRIZ DE PESO FREQUÊNCIA E QUANTIDADE DE APRESENTAÇÃO: ");
        console.table($scope.matrizDePesoFreqEQtAp);
        console.log("-----------------------------------------------------------");

        //Inicializando os valores das matrizes de peso Impacto e Pesquisa
        $scope.matrizDePesoImpactEPesq[0] = 7/8; 
        $scope.matrizDePesoImpactEPesq[1] = 1/8; 

        console.log("MATRIZ DE PESO IMPACTO E PESQUISA: ");
        console.table($scope.matrizDePesoImpactEPesq);
        console.log("-----------------------------------------------------------");

        // criando as matrizes de comparacoes 
        for(i in $scope.extensoesQt){
          $scope.matrizComparacaoImpacInt[i] = []
          $scope.matrizComparacaoImpacExt[i] = []
          $scope.matrizComparacaoFreqMen[i] = [];
          $scope.matrizComparacaoQtApr[i] = [];
        }

        //preenchendo as colunas

        for(i in $scope.extensoesQt){
          for(j in $scope.extensoesQt){

            if($scope.extensoesQt[i].impactInterno === 0){
              $scope.valorColocado($scope.extensoesQt[j].impactInterno);
              if($scope.matrizComparacaoImpacInt[j][i] === $scope.auxiliarValor){
                $scope.matrizComparacaoImpacInt[i][j] = 1/$scope.auxiliarValor;
              }else{
                $scope.matrizComparacaoImpacInt[i][j] = $scope.auxiliarValor;
              }
            }else if($scope.extensoesQt[j].impactInterno === 0){
             $scope.valorColocado($scope.extensoesQt[i].impactInterno);
             if($scope.matrizComparacaoImpacInt[j][i] === $scope.auxiliarValor){
              $scope.matrizComparacaoImpacInt[i][j] = 1/$scope.auxiliarValor;
            }else{
              $scope.matrizComparacaoImpacInt[i][j] = $scope.auxiliarValor;
            }
           }else if(($scope.extensoesQt[i].impactInterno === 0)&&($scope.extensoesQt[j].impactInterno === 0)){
            $scope.matrizComparacaoImpacInt[i][j] = 1;
           }else{
              $scope.matrizComparacaoImpacInt[i][j] = $scope.extensoesQt[i].impactInterno / $scope.extensoesQt[j].impactInterno ;
            }

          
            if($scope.extensoesQt[i].impactExterno === 0){
              $scope.valorColocado($scope.extensoesQt[j].impactExterno);
              if($scope.matrizComparacaoImpacExt[j][i] === $scope.auxiliarValor){
                $scope.matrizComparacaoImpacExt[i][j] = 1/$scope.auxiliarValor;
              }else{
                $scope.matrizComparacaoImpacExt[i][j] = $scope.auxiliarValor;
              }

            }else if($scope.extensoesQt[j].impactExterno === 0){
              $scope.valorColocado($scope.extensoesQt[i].impactExterno);
              if($scope.matrizComparacaoImpacExt[j][i] === $scope.auxiliarValor){
                $scope.matrizComparacaoImpacExt[i][j] = 1/$scope.auxiliarValor;
              }else{
                $scope.matrizComparacaoImpacExt[i][j] = $scope.auxiliarValor;
              }
             
            }else if(($scope.extensoesQt[i].impactExterno === 0)&&($scope.extensoesQt[j].impactExterno === 0)){
              $scope.matrizComparacaoImpacExt[i][j] = 1;
            }else{
              $scope.matrizComparacaoImpacExt[i][j] = $scope.extensoesQt[i].impactExterno / $scope.extensoesQt[j].impactExterno ;
           
            }


            if($scope.extensoesQt[i].freqMencHonr === 0){
              $scope.valorColocado($scope.extensoesQt[j].freqMencHonr);
              $scope.auxiliarValor+=2;
              if($scope.matrizComparacaoFreqMen[j][i] === $scope.auxiliarValor){
                $scope.matrizComparacaoFreqMen[i][j] = 1/$scope.auxiliarValor;
              }else{
                $scope.matrizComparacaoFreqMen[i][j] = $scope.auxiliarValor;
              }

            }else if($scope.extensoesQt[j].freqMencHonr === 0){
              $scope.valorColocado($scope.extensoesQt[i].freqMencHonr);
              $scope.auxiliarValor+=2;
              if($scope.matrizComparacaoFreqMen[j][i] === $scope.auxiliarValor){
                $scope.matrizComparacaoFreqMen[i][j] = 1/$scope.auxiliarValor;
              }else{
                $scope.matrizComparacaoFreqMen[i][j] = $scope.auxiliarValor;
              }
            }else if(($scope.extensoesQt[i].freqMencHonr === 0) && ($scope.extensoesQt[j].freqMencHonr === 0) ){
              $scope.matrizComparacaoFreqMen[i][j] = 1;
            }else{
              if($scope.matrizComparacaoFreqMen[j][i] ===(($scope.extensoesQt[i].freqMencHonr / $scope.extensoesQt[j].freqMencHonr)+2) ){
                $scope.matrizComparacaoFreqMen[i][j] = 1/(($scope.extensoesQt[i].freqMencHonr / $scope.extensoesQt[j].freqMencHonr)+2);
              }else{
                $scope.matrizComparacaoFreqMen[i][j] = ($scope.extensoesQt[i].freqMencHonr / $scope.extensoesQt[j].freqMencHonr)+2;

              }
            }



            if($scope.extensoesQt[i].qtApresentacao === 0){
              $scope.valorColocado($scope.extensoesQt[j].qtApresentacao);
              if($scope.matrizComparacaoQtApr[j][i] === $scope.auxiliarValor){
                $scope.matrizComparacaoQtApr[i][j] = 1/$scope.auxiliarValor;
              }else{
                $scope.matrizComparacaoQtApr[i][j] = $scope.auxiliarValor;
              }
            }else if($scope.extensoesQt[j].qtApresentacao === 0){
              $scope.valorColocado($scope.extensoesQt[i].qtApresentacao);
              if($scope.matrizComparacaoQtApr[j][i] === $scope.auxiliarValor){
                $scope.matrizComparacaoQtApr[i][j] = 1/$scope.auxiliarValor;
              }else{
                $scope.matrizComparacaoQtApr[i][j] = $scope.auxiliarValor;
              }
            }else if(($scope.extensoesQt[i].qtApresentacao === 0) && ($scope.extensoesQt[j].qtApresentacao === 0)){
              $scope.matrizComparacaoQtApr[i][j] = 1;
            }else{
              $scope.matrizComparacaoQtApr[i][j] = $scope.extensoesQt[i].qtApresentacao / $scope.extensoesQt[j].qtApresentacao;
            }
            
          }
        }

        console.log("MATRIZ DE COMPARAÇÃO IMPACTO INTERNO: ");
        console.table($scope.matrizComparacaoImpacInt);
        console.log("-----------------------------------------------------------");
        
        console.log("MATRIZ DE COMPARAÇÃO IMPACTO EXTERNO: ");
        console.table($scope.matrizComparacaoImpacExt);
        console.log("-----------------------------------------------------------");

        console.log("MATRIZ DE COMPARAÇÃO FREQUÊNCIA MENÇÃO HONROSA: ");
        console.table($scope.matrizComparacaoFreqMen);
        console.log("-----------------------------------------------------------");

        console.log("MATRIZ DE COMPARAÇÃO QUANTIDADE DE APRESENTAÇÃO: ");
        console.table($scope.matrizComparacaoQtApr);
        console.log("-----------------------------------------------------------");


        
        $scope.obterMediaDasLinhas($scope.matrizComparacaoImpacInt, $scope.matrizComparacaoImpacIntMediaLinhas);
        $scope.obterMediaDasLinhas($scope.matrizComparacaoImpacExt, $scope.matrizComparacaoImpacExtMediaLinhas);
        $scope.obterMediaDasLinhas($scope.matrizComparacaoFreqMen, $scope.matrizComparacaoFreqMenMediaLinhas);
        $scope.obterMediaDasLinhas($scope.matrizComparacaoQtApr, $scope.matrizComparacaoQtAprMediaLinhas);


        console.log("MATRIZ DE MÉDIA DAS LINHAS IMPACTO INTERNO ");
        console.table($scope.matrizComparacaoImpacIntMediaLinhas);
        console.log("-----------------------------------------------------------");
        
        console.log("MATRIZ DE MÉDIA DAS LINHAS IMPACTO EXTERNO: ");
        console.table($scope.matrizComparacaoImpacExtMediaLinhas);
        console.log("-----------------------------------------------------------");

        console.log("MATRIZ DE MÉDIA DAS LINHA FREQUÊNCIA MENÇÃO HONROSA: ");
        console.table($scope.matrizComparacaoFreqMenMediaLinhas);
        console.log("-----------------------------------------------------------");

        console.log("MATRIZ DE MÉDIA DAS LINHAS QUANTIDADE DE APRESENTAÇÃO: ");
        console.table($scope.matrizComparacaoQtAprMediaLinhas);
        console.log("-----------------------------------------------------------");

        $scope.resultadoImpacIntEExtr[0] = $scope.matrizComparacaoImpacIntMediaLinhas;
        $scope.resultadoImpacIntEExtr[1] = $scope.matrizComparacaoImpacExtMediaLinhas;

        $scope.resultadoFreqEQt[0] = $scope.matrizComparacaoFreqMenMediaLinhas;
        $scope.resultadoFreqEQt[1] = $scope.matrizComparacaoQtAprMediaLinhas;

        $scope.obterResultadoFinal();


        sessionStorage.userService = angular.toJson($scope.extensoesQt);

        for(i in $scope.extensoesQt){
          $scope.extensoesQt[i].resultado = $scope.resultadoFinal[i];
        }

        sessionStorage.userService = angular.toJson($scope.extensoesQt);

      }

    $scope.obterMediaDasLinhas = function(matriz, matrizMediaLinha){
      let auxiliar = []; 
      let auxiliar2 = 0;
      
      for(i in $scope.extensoesQt){
        for(j in $scope.extensoesQt){
          auxiliar2 += matriz[j][i];
        }
        auxiliar[i] = auxiliar2;
        auxiliar2= 0;
      }

      let tamanho = 0;

      for(i in $scope.extensoesQt){
        tamanho++;
        for(j in $scope.extensoesQt){
          matriz[i][j] = matriz[i][j]/auxiliar[j];
        }
      }


      for(i in $scope.extensoesQt){
        matrizMediaLinha[i] = 0;
        for(j in $scope.extensoesQt){
          matrizMediaLinha[i] +=  matriz[i][j];
        }
        matrizMediaLinha[i] = matrizMediaLinha[i]/tamanho;
      }

    }

    $scope.obterResultadoFinal = function(){

     
      
      for(i in $scope.extensoesQt){
        $scope.resultado[i] = ($scope.resultadoImpacIntEExtr[0][i] * $scope.matrizDePesoImpacInteExt[0]) + ($scope.resultadoImpacIntEExtr[1][i] * $scope.matrizDePesoImpacInteExt[1]);
      }

      console.log("RESULTADO IMPACTO INTERNO E EXTERNO: ");
      console.table($scope.resultado);
      console.log("-----------------------------------------------------------");

      for(i in $scope.extensoesQt){
        $scope.resultado2[i] = ($scope.resultadoFreqEQt[0][i] *  $scope.matrizDePesoFreqEQtAp[0]) + ($scope.resultadoFreqEQt[1][i] *  $scope.matrizDePesoFreqEQtAp[1]);
      }

      console.log("RESULTADO FREQUENCIA MENÇÃO  E QUANTIDADE DE APRESENTACAO: ");
      console.table($scope.resultado2);
      console.log("-----------------------------------------------------------");


     $scope.resultadoPesqEImpac[0] =  $scope.resultado;
     $scope.resultadoPesqEImpac[1] =  $scope.resultado2;
      
     for(i in $scope.extensoesQt){
      $scope.resultadoFinal[i] = ($scope.resultadoPesqEImpac[0][i] *  $scope.matrizDePesoImpactEPesq[0]) + ($scope.resultadoPesqEImpac[1][i] *  $scope.matrizDePesoImpactEPesq[1]);
    }

    
    console.log("RESULTADO FINAL(IMPACTO X PESQUISA): ");
    console.table($scope.resultadoFinal);
    console.log("-----------------------------------------------------------");
    

    }
    


});