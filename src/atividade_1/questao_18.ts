class Numero {
    valor: number = 0;

    ehPar(): boolean {
        return this.valor % 2 == 0;
    }

    ehImpar(): boolean {
        return !this.ehPar();
    }

    somar(outroNumero: number): number {
        return this.valor + outroNumero;
    }

    somarNumeros(outroNumero: Numero): Numero {
        let resultado: Numero = new Numero();

        resultado.valor = this.valor + outroNumero.valor;

        return resultado;
    }
}

let numero1 = new Numero();
numero1.valor = 10;

let numero2 = new Numero();
numero2.valor = 5;

console.log(numero1.ehPar());
console.log(numero1.ehImpar());
console.log(numero1.somar(5));

let resultado = numero1.somarNumeros(numero2);

console.log(resultado.valor);