class Calculadora{
    // requisito A
    private operando1: number;
    private operando2: number;

    // requisito C
    constructor(operando1:number, operando2: number){
        this.operando1 = operando1;
        this.operando2 = operando2;
    }

    // requisito B
    soma(): number{
        let soma = this.operando1 + this.operando2;
        this.operando2 = this.operando1;
        this.operando1 = soma;
        return soma;
    }
    
    
    subtracao(): number{
        let subtracao = this.operando1 - this.operando2;
        this.operando2 = this.operando1;
        this.operando1 = subtracao;
        return subtracao;
    }
}

let calc : Calculadora = new Calculadora(1, 10);
console.log(calc.operando1); // erro
console.log(calc.soma());
console.log(calc.subtracao());