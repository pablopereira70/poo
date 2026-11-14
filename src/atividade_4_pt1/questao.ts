class Cliente{
    private _id: number;
    private nome: string;
    private _cpf: string;
    private dataNascimento: Date;
    private _contas: Conta[];

    constructor(id: number, nome: string, cpf: string, dataNasc: Date){
        this._id = id;
        this.nome = nome;
        this._cpf = cpf;
        this.dataNascimento = dataNasc;
        this._contas = [];
    }

    get cpf(): string{
        return this._cpf;
    }

    get contas(): Conta[]{
        return this._contas;
    }

    get id(): number{
        return this._id;
    }
}

class Conta {
    private _id: number;
    private _numero: string;
    private _saldo: number;
    private _cliente: Cliente;
    private dataDeAbertura: Date;

    constructor(id: number, numero: string, saldo: number, data: Date, cliente: Cliente) {
        this._id = id;
        this._numero = numero;
        this._saldo = saldo;
        this.dataDeAbertura = data;
        this._cliente = cliente;
    } 

    depositar(valor: number): boolean {
        if(valor <= 0) return false;
        this._saldo += valor;
        return true;

    }

    sacar(valor: number): boolean {
        if(valor > this._saldo) return false;
        this._saldo -= valor;
        return true;
    }

    transferir(contaDestino: Conta, valor: number): void {
        if(this.sacar(valor)) contaDestino.depositar(valor);
    }

    get saldo(): number{
        return this._saldo;
    }

    get numero(): string{
        return this._numero;
    }

    get id(): number{
        return this._id;
    }

    get cliente(): Cliente{
        return this._cliente;
    }
}

class Banco {
    private clientes: Cliente[];
    private contas: Conta[];

    constructor() {
        this.contas = [];
        this.clientes = []
    }

    inserirCliente(cliente: Cliente): void{
        for(let c of this.clientes) if(c.cpf == cliente.cpf || c.id == cliente.id) return; // RN

        this.clientes.push(cliente);
    }

    consultarCliente(cpf: string): Cliente | null{
        for(let cliente of this.clientes){
            if(cliente.cpf == cpf) return cliente;
        }
        return null
    }

    associarContaCliente(numeroConta: string, cpf: string): void{
        let conta = this.consultarConta(numeroConta);
        let cliente = this.consultarCliente(cpf);

        if(conta == null || cliente == null) return; // verifica se ambos existem

        if(conta.cliente != cliente) return; // verifica o cliente associado a conta

        for(let c of cliente.contas){ // verifica se a conta já foi associada
            if(c == conta) return;
        }

        cliente.contas.push(conta);
    }

    inserirConta(conta: Conta): void {
        for(let c of this.contas) if(c.id == conta.id || c.numero == conta.numero) return; //RN

        this.contas.push(conta);
    }

    consultarConta(numeroConta: string): Conta | null {

        for (let conta of this.contas) {
            if (conta.numero == numeroConta) {
                return conta;
            }
        }

        return null;
    }

    private consultarIndice(numeroConta: string): number {
        for (let i = 0; i < this.contas.length; i++) {
            let conta = this.contas[i];
            if (conta!.numero == numeroConta) {
                return i;
            }
        }

        return -1;
    }


    listarContasCliente(cpf: string): Conta[]{
        let cliente = this.consultarCliente(cpf);
        if(cliente) return cliente.contas;
        else return [];
    }


    totalizarSaldoCliente(cpf:string): number{
        let saldo = 0;
        let cliente = this.consultarCliente(cpf);

        if(cliente) for(let conta of cliente.contas) saldo += conta.saldo;

        return saldo;
    }

    depositar(num: string, valor: number): void {
        let contaProcurada: Conta | null = this.consultarConta(num);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    sacar(num: string, valor: number): void {
        let contraProcurada: Conta | null = this.consultarConta(num);
        
        if (contraProcurada) {
            contraProcurada.sacar(valor);
        }
    }

    transferir(numOrigem: string, numDestino: string, valor: number): void {
        let contaOrigem: Conta | null = this.consultarConta(numOrigem);
        let contaDestino: Conta | null = this.consultarConta(numDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }
}