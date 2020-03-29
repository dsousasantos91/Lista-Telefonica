angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http, contatosAPI, operadorasAPI, serialGenerator) {
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];
    // $scope.contato = {
    //     data: 1602298800000
    // };

    var carregarContatos = function () {
        contatosAPI.getContatos()
        .then(function(response) {
            $scope.contatos = response.data;
        }).catch(function (response) {
            $scope.error = "Não foi possível carregar os dados!";
        });
    };

    var carregarOperadoras = function () {
        operadorasAPI.getOperadoras()
        .then(function(response) {
            $scope.operadoras = response.data;
        });
    };

    $scope.adicionarContato = function(contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato)
        .then(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine(true);
            // $scope.contatos.push(response.data);
            carregarContatos();
        });
    };
    $scope.apagarContatos = function(contatos) {
        $scope.contatos = contatos.filter((contato) => {
            if (!contato.selecionado) return contato;
        });
    };
    $scope.isContatoSelecionado = function(contatos) {
        return contatos.some((contato) => {
            return contato.selecionado;
        });
    };
    $scope.ordenarPor = function(campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarContatos();
    carregarOperadoras();

});
