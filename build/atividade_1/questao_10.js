"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SituacaoFinanceira {
    creditos = 0;
    debitos = 0;
    calcularSaldo() {
        return this.creditos - this.debitos;
    }
}
let situacaoFinanceira = new SituacaoFinanceira();
situacaoFinanceira.creditos = 2000;
situacaoFinanceira.debitos = 750;
console.log(situacaoFinanceira.calcularSaldo());
//# sourceMappingURL=questao_10.js.map