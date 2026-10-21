class ColecaoNumeros{
    numeros : number[];

    constructor(){
        this.numeros = [];
    }

    adicionar(numero: number): void{
        this.numeros.push(numero);
    }


    limpar(): void{
        this.numeros = [];
    }


    quantidade(): number{
        return this.numeros.length;
    }


    somar(): number{
        let soma = 0;

        for(let i = 0; i < this.quantidade(); i++){
            soma += this.numeros[i]!;
        }

        return soma;
    }


    calcularMedia(): number{
        return this.somar() / this.quantidade();
    }


    maior(): number | undefined{
        if(this.quantidade() == 0) return undefined;


         let maior = this.numeros[0]!;

        for(let i = 0; i < this.quantidade(); i++){
            if(this.numeros[i]! > maior) maior = this.numeros[i]!;
        }

        return maior;
    }


    menor(): number| undefined{
         if(this.quantidade() == 0) return undefined;

        let menor = this.numeros[0]!;

        for(let i = 0; i < this.quantidade(); i++){
            if(this.numeros[i]! < menor) menor = this.numeros[i]!;
        }

        return menor;
    }
}

let colecao : ColecaoNumeros = new ColecaoNumeros;
colecao.adicionar(10);
colecao.adicionar(20);
colecao.adicionar(30);
console.log(colecao);
console.log(colecao.quantidade());
console.log(colecao.somar());
console.log(colecao.calcularMedia());
console.log(colecao.maior());
console.log(colecao.menor());
colecao.limpar();
colecao.adicionar(-8);
colecao.adicionar(-12);
colecao.adicionar(-3);
console.log(colecao);
console.log(colecao.quantidade());
console.log(colecao.somar());
console.log(colecao.calcularMedia());
console.log(colecao.maior());
console.log(colecao.menor());
colecao.limpar()
console.log(colecao);
