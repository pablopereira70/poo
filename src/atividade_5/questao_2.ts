class Hora{
    // requisito A
    private _hora: number;
    private _minuto: number;
    private _segundo: number;

    constructor(hora: number, minuto: number, segundo: number){
        this._segundo = segundo % 60; 
        this._minuto = (minuto + 
            Math.trunc(segundo / 60)) 
            % 60;
        this._hora = hora + Math.trunc(
            Math.trunc(minuto + 
                Math.trunc(segundo / 60)) 
                / 60);
    }

    // requisito B
    get hora(): number{
        return this._hora;
    }

    get minuto(): number{
        return this._minuto;
    }

    get segundo(): number{
        return this._segundo;
    }
    
    // requisito C
    horario(): string{
        return `${this._hora}:${this._minuto}:${this.segundo}`;
    }
}

let hora1 : Hora = new Hora(127,71,23);
console.log(hora1.hora);
console.log(hora1.minuto);
console.log(hora1.segundo);
console.log(hora1.horario());