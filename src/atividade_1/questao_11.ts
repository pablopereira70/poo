class Pessoa {
    nome: string = "";
    idade: number = 0;

    apresentar(): string{
        return `Meu nome é ${this.nome} e tenho ${this.idade} anos.`
    }
}

let pessoa = new Pessoa();
pessoa.nome = "Ely";
pessoa.idade = 46;
console.log(pessoa.apresentar());