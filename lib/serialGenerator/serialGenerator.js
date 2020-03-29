// Neste módulo não usamos a referênciação do módulo e criamos o serviço no momento da instanciação.
// O módulo poderia ser localizado ouo referẽnciado por uma variável.
// angular.module("serialGenerator", []);
// var serial = angular.module("serialGenerator", []);

angular.module("serialGenerator", []).provider("serialGenerator", function () {
    var _length = 10;

    this.getLength = function () {
        return _length
    };

    this.setLength = function (length) {
        _length = length;
    };

    this.$get = function () {
        return {
            generate: function () {
                var serial = "";
                while (serial.length < _length) {
                    serial += String.fromCharCode(Math.floor(Math.random() * 64) + 32);
                }
                return serial;
            }
        };
    }
});
