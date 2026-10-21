class RegistroTemperaturas{
    temperaturas : number[];
    limiteAlerta: number;

    constructor(){
        this.temperaturas = [];
        this.limiteAlerta = 30;
    }


    adicionar(temperatura: number): void{
        this.temperaturas.push(temperatura);
    }


    alterarLimite(limite: number): void{
        this.limiteAlerta = limite;
    }


    listar(): string{
        let linhas = "";

        this.temperaturas.forEach((temp, indice)=> {
            linhas += `Dia ${indice}: ${temp} °C\n`;
        });

        return linhas;
    }


    acimaDoLimite(): number[]{
        return this.temperaturas.filter((temp)=> temp > this.limiteAlerta);
    }


    converterParaFahrenheit():number[]{
        return this.temperaturas.map((temp) => temp * 1.8 + 32);
    }


    calcularMedia(): number{
        return this.temperaturas.reduce((acumulador, atual) => acumulador + atual, 0) / this.temperaturas.length;
    }
}


let registros : RegistroTemperaturas = new RegistroTemperaturas;
registros.adicionar(28);
registros.adicionar(31);
registros.adicionar(29);
registros.adicionar(35);
registros.adicionar(32);
registros.adicionar(27);
registros.adicionar(30);
console.log(registros.listar());
console.log(registros.calcularMedia());
console.log(registros.acimaDoLimite());
console.log(registros.converterParaFahrenheit());
registros.alterarLimite(32);
console.log(registros.acimaDoLimite());