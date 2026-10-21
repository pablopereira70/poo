class Estacionamento{
    placa: string;
    horas: number;

    constructor(placa: string){
        this.placa = placa;
        this.horas = 0;
    } 


    registrarPermanencia(horas: number):void{
        if(horas > 0){
            this.horas += horas;
        }
    }


    calcularHorasCobradas(): number{
        return Math.trunc(this.horas);
    }


    calcularValor(): number{
        let valor = this.calcularHorasCobradas()
        if(valor == 0) return 0;
        else if(valor == 1) return 8;
        else return 8 + (valor - 1) * 5;
    }

    emitirTicket(): string{
        return `Placa: ${this.placa}
                Horas cobradas: ${this.calcularHorasCobradas()}
                Valor: ${this.calcularValor()}`
    }
}

let carro : Estacionamento = new Estacionamento("AB1234");
carro.registrarPermanencia(0);
console.log(carro.emitirTicket())
carro.registrarPermanencia(1);
console.log(carro.emitirTicket())
carro.registrarPermanencia(1.2);
console.log(carro.emitirTicket())
carro.registrarPermanencia(3.5);
console.log(carro.emitirTicket())
carro.registrarPermanencia(-2);
console.log(carro.emitirTicket())