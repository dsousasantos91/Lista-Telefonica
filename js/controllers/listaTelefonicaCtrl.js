angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http, serialGenerator, contatos, operadoras, $filter) {
    $scope.app = $filter("upper")("Lista Telefonica");
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;

    // $scope.contato = {
    //     data: 1602298800000
    // };

    /*var carregarContatos = function () {
        contatosAPI.getContatos()
        .then(function(response) {
            $scope.contatos = response.data;
        }).catch(function (response) {
            $scope.error = "Não foi possível carregar os dados!";
        });
    };*/

    /*var carregarOperadoras = function () {
        operadorasAPI.getOperadoras()
        .then(function(response) {
            $scope.operadoras = response.data;
        });
    };*/


    var init = function () {
        calcularImpostos($scope.contatos);
        generateSerial($scope.contatos);
    };

    var calcularImpostos = function (contatos) {
        contatos.forEach(function (contato) {
            contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
        })
    };

    var generateSerial = function (contatos) {
        contatos.forEach(function (contato) {
            contato.serial = serialGenerator.generate();
        });
    };

    $scope.adicionarContato = function(contato) {
        contato.serial = serialGenerator.generate();
        // contato.data = new Date();
        contatosAPI.saveContato(contato)
        .then(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine(true);
            // $scope.contatos.push(response.data);
            // carregarContatos();
        });
    };
    $scope.apagarContatos = function(contatos) {
        $scope.contatos = contatos.filter((contato) => {
            if (!contato.selecionado) return contato;
        });
        $scope.verificarContatoSelecionado($scope.contatos);
    };

    // TODO(douglas-s-santos): Trata retorno boolean da function
    $scope.verificarContatoSelecionado = function(contatos) {
        $scope.hasContatoSelecionado = !contatos.some(function (contato) {
            return contato.selecionado;
        });
    };

    $scope.ordenarPor = function(campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    var calcularImposto = function(preco) {
        var imposto = 1.2;
        return preco * imposto;
    };

    $scope.reset = function() {
        $scope.contatos = angular.copy($scope.contatos);
    };

    // carregarContatos();
    // carregarOperadoras();

    init();

});
