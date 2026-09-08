var Numero = /** @class */ (function () {
    function Numero() {
        this.valor = 0;
    }

    Numero.prototype.ehPar = function () {
        return this.valor % 2 == 0;
    };

    Numero.prototype.ehImpar = function () {
        return !this.ehPar();
    };

    Numero.prototype.somar = function (outroNumero) {
        return this.valor + outroNumero;
    };

    Numero.prototype.somarNumeros = function (outroNumero) {
        var resultado = new Numero();
        resultado.valor = this.valor + outroNumero.valor;
        return resultado;
    };

    return Numero;
}());