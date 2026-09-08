class SituacaoFinanceira {
    creditos: number = 0;
    debitos: number = 0;

    calcularSaldo():number {
        return this.creditos - this.debitos;
    }
}

let situacaoFinanceira = new SituacaoFinanceira();
situacaoFinanceira.creditos = 2000;
situacaoFinanceira.debitos = 750;
console.log(situacaoFinanceira.calcularSaldo());