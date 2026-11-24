class Produto{
    private _id: number;
    private _descricao: string;
    private _quantidade: number;
    private _valorUnitario: number;

    constructor(id: number, descricao: string, quantidade: number, valorUnitario: number){
        this._id = id;
        this._descricao = descricao;
        this._quantidade = quantidade;
        this._valorUnitario = valorUnitario;
    }

    repor(quantidade: number): void{
        if(quantidade <= 0) return;
        this._quantidade += quantidade;
    }

    darBaixa(quantidade: number): void{
        if(quantidade <= 0) return;
        if(quantidade > this._quantidade) return;
        this._quantidade -= quantidade;
    }

    get id(): number{
        return this._id
    }

     get descricao(): string{
        return this._descricao;
    }
}

class ProdutoPerecivel extends Produto{
    private _dataValidade: Date;

    constructor(id: number, descricao: string, quantidade: number, valorUnitario: number, data: Date){
        super(id, descricao, quantidade, valorUnitario);
        this._dataValidade = data;
    }

    ehValido(): boolean{
        if(this._dataValidade >= new Date()) return true;
        else return false;
    }

    repor(quantidade: number): void{
        if(this.ehValido()) super.repor(quantidade);
    }

    darBaixa(quantidade: number): void{
        if(this.ehValido()) super.darBaixa(quantidade);
    }
}

class Estoque{
    private produtos : Produto[];

    constructor(){
        this.produtos = [];
    }

    private consultarIndice(id: number): number{
        let indice = -1;

        for(let i=0; i < this.produtos.length; i++){
            if(this.produtos[i]!.id == id) indice = i;
        }

        return indice;
    }

    private existe(id: number, desc: string): boolean{
        for(let p of this.produtos){
            if(p.id == id || p.descricao == desc) return true;
        }
        return false;
    }

    inserir(produto: Produto): void{
        if(this.existe(produto.id, produto.descricao)) return;

        this.produtos.push(produto);
    }

    consultar(id: number): Produto | null{
        let produto = null;

        for(let p of this.produtos){
            if(p.id == id) produto = p;
        }

        return produto;
    }

    excluir(id: number): void{
        let produto = this.consultar(id);

        if(produto == null) return;

        let indice = this.consultarIndice(id);

        for(let i=indice; i < this.produtos.length - 1; i++){
            this.produtos[i] = this.produtos[i+1]!;
        }
        this.produtos.pop();
    }

    repor(id: number, quantidade: number): void{
        let produto = this.consultar(id);

        if(produto == null) return;

        produto.repor(quantidade);
    }

    darBaixa(id:number, quantidade: number): void{
        let produto = this.consultar(id);

        if(produto == null) return;

        produto.darBaixa(quantidade);
    }

    listarVencidos(): ProdutoPerecivel[]{
        let vencidos = [];

        for(let p of this.produtos){
            if(p instanceof ProdutoPerecivel && !p.ehValido()){
                vencidos.push(p);
            }
        }

        return vencidos;
    }
}