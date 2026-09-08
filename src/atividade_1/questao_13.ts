class Numero {
    valor: number = 0;

    ehPar(): boolean{
        return this.valor % 2 == 0;
    }

    ehImpar(): boolean{
        return !this.ehPar();
    }
}

let numero = new Numero();
numero.valor = 10;
console.log(numero.ehPar());
console.log(numero.ehImpar());