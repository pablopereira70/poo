"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Numero {
    valor = 0;
    ehPar() {
        return this.valor % 2 == 0;
    }
    ehImpar() {
        return !this.ehPar();
    }
}
let numero = new Numero();
numero.valor = 10;
console.log(numero.ehPar());
console.log(numero.ehImpar());
//# sourceMappingURL=questao_13.js.map