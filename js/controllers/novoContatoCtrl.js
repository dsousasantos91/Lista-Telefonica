angular.module("listaTelefonica").controller("novoContatoCtrl", function($scope, $http, serialGenerator, contatosAPI, $location, operadoras) {
    $scope.operadoras = operadoras.data;

    $scope.adicionarContato = function(contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato)
        .then(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine(true);
            // $scope.contatos.push(response.data);
            $location.path("/contatos");
        });
    };

});
