class Cronometro{
    segundos : number = 0;

    avancar(valor: number): void{
        if(valor > 0){
            this.segundos += valor;
        }
    }


    zerar(): void{
        this.segundos = 0;
    }


    emMinutos(): number{
        return this.segundos / 60;
    }
}
let cronometro1 : Cronometro = new Cronometro;
cronometro1.avancar(90);
console.log(cronometro1);
cronometro1.avancar(30);
console.log(cronometro1);
console.log(cronometro1.emMinutos(), "min");
cronometro1.zerar();
console.log(cronometro1);
let cronometro2 : Cronometro = new Cronometro;
cronometro2.avancar(30);
console.log(cronometro1);
console.log(cronometro2);