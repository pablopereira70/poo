import { Calculadora } from "./questao_2";

class CalculadoraCientifica extends Calculadora{
    constructor(operando1:number, operando2:number){
        super(operando1, operando2);
    }

    // requisito A
    exponenciar(): number{
        let potencia : number = this.operando1 ** this.operando2
        this.operando1 = potencia;
        return potencia;
    }
}

// requisito B
let calc : CalculadoraCientifica = new CalculadoraCientifica(2, 2);
console.log(calc.exponenciar());
console.log(calc.exponenciar());