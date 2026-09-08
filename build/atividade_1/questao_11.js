"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pessoa {
    nome = "";
    idade = 0;
    apresentar() {
        return `Meu nome é ${this.nome} e tenho ${this.idade} anos.`;
    }
}
let pessoa = new Pessoa();
pessoa.nome = "Ely";
pessoa.idade = 46;
console.log(pessoa.apresentar());
//# sourceMappingURL=questao_11.js.map