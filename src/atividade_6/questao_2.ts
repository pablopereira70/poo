export class Calculadora{
    // requisito A
    private _operando1: number;
    private _operando2: number;

    // requisito B
    constructor(operando1:number, operando2: number){
        this._operando1 = operando1;
        this._operando2 = operando2;
    }

    // requisito C
    soma(): number{
        let soma : number = this._operando1 + this._operando2;
        this._operando2 = this._operando1;
        this._operando1 = soma;
        return soma;
    }

    get operando1(): number{
        return this._operando1;
    }

    set operando1(operando1:number){
        this._operando1 = operando1;
    }

    get operando2(): number{
        return this._operando2;
    }

    set operando2(operando2:number){
        this._operando2 = operando2;
    }
}

//requisito D
// let calc : Calculadora = new Calculadora(20, 10);
// console.log(calc.soma())
// console.log(calc.soma())