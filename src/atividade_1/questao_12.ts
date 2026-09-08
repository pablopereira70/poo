class Produto {
    nome: string = "";
    preco: number = 0;

    aplicarDesconto(percentual: number): number{
        return this.preco - (this.preco * percentual);
    }

    emitirOrcamento(percentual: number): string{
        return `Produto: ${this.nome}, Preço: ${this.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\nDesconto: ${percentual * 100}% --> Novo preço: ${this.aplicarDesconto(percentual).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`; 
    }
}

let produto = new Produto();
produto.nome = "Camisa";
produto.preco = 100;
console.log(produto.emitirOrcamento(0.1));