"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Produto {
    nome = "";
    preco = 0;
    aplicarDesconto(percentual) {
        return this.preco - (this.preco * percentual);
    }
    emitirDesconto(percentual) {
        return `Produto: ${this.nome}, Preço: ${this.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\nDesconto: ${percentual * 100}% --> Novo preço: ${this.aplicarDesconto(percentual).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    }
}
let produto = new Produto();
produto.nome = "Camisa";
produto.preco = 100;
console.log(produto.emitirDesconto(0.1));
//# sourceMappingURL=questao_12.js.map