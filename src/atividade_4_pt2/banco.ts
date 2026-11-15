export class Cliente{
    private _id:number;
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
    adicionarConta(conta: Conta){
        if(conta.cliente != null && conta.cliente.id != this.id) return;
        for(let c of this._contas) if(c == conta) return;  
        this._contas.push(conta);                   
        conta.cliente = this;                
    }

    removerConta(numero: string){
        let novaContas: Conta[] = [];

        for(let conta of this._contas){
            if(conta.numero == numero) {
                conta.cliente = null
                continue;
            } else novaContas.push(conta);
        }

        this._contas = novaContas;
    }

    get cpf(): string{
        return this._cpf;
    }

    get id(): number{
        return this._id;
    }

    get contas(): Conta[]{
        return [...this._contas];
    }
}

export class Conta{
    private _id:number;
    private _numero:string;
    private _saldo:number;
    private _cliente:Cliente|null;
    private dataDeAbertura: Date;

    constructor(id:number, numero:string, saldo: number, data:Date, cliente: Cliente|null){
        this._id = id;
        this._numero = numero;
        this._saldo  = saldo;
        this._cliente = cliente;
        this.dataDeAbertura = data;
    }

    depositar(valor: number): boolean{
        if(valor <= 0) return false;
        this._saldo += valor;
        return true;
    }

    sacar(valor: number): boolean{
         if(valor <= 0) return false;
        if(valor > this._saldo) return false;
        this._saldo -= valor;
        return true;
    }

    transferir(destino: Conta, valor: number): boolean{
        if(!this.sacar(valor)) return false;

        if(!destino.depositar(valor)){
        this.depositar(valor);
        return false;
    }
    return true;
    }

    get saldo():number {
        return this._saldo;
    }

    get numero(): string{
        return this._numero;
    }

    get id(): number{
        return this._id;
    }

    get cliente(): Cliente|null{
        return this._cliente;
    }

    set cliente(cliente: Cliente | null){
        this._cliente = cliente;
    }
}

export class Banco{
    private clientes: Cliente[];
    private contas: Conta[];

    constructor() {
        this.clientes = [];
        this.contas = [];
    }

    inserirConta(conta: Conta): void{
        for(let c of this.contas) if(c.id == conta.id || c.numero == conta.numero) return;

        if(conta.cliente != null){
            if(this.consultarCliente(conta.cliente.cpf) != null){
                this.contas.push(conta);
                conta.cliente.adicionarConta(conta);
            } else{
                return;
            }
        } else{
            this.contas.push(conta);
        }
    }

    inserirCliente(cliente: Cliente): void{
        for(let c of this.clientes) if(c.id == cliente.id || c.cpf == cliente.cpf) return;

        this.clientes.push(cliente);
    }

    consultarConta(numero: string): Conta | null{
        for(let conta of this.contas) if(conta.numero == numero) return conta;
        return null;
    }

    consultarCliente(cpf: string): Cliente | null{
        for(let cliente of this.clientes) if(cliente.cpf == cpf) return cliente;
        return null;
    }

    associarContaCliente(numeroConta: string, cpf: string): void{
        let conta = this.consultarConta(numeroConta);
        let cliente = this.consultarCliente(cpf);

        if(conta == null || cliente == null) return;

        cliente.adicionarConta(conta);
    }

    listarContasCliente(cpf: string): Conta[]{
        let cliente = this.consultarCliente(cpf);
        if(cliente != null) return cliente.contas;
        else return [];
    }

    totalizarSaldoCliente(cpf: string): number{
        let saldo = 0;
        let cliente = this.consultarCliente(cpf);
        if(cliente != null) for(let conta of cliente.contas) saldo += conta.saldo;
        return saldo;
    }

    sacar(num: string, valor: number): boolean{
        let conta = this.consultarConta(num);
        if(conta == null) return false;
        return conta.sacar(valor);
    }

    depositar(num: string, valor: number): boolean{
        let conta = this.consultarConta(num);
        if(conta == null) return false;
        return conta.depositar(valor);
    }

    transferir(numOrigem: string, numDestino: string, valor: number): boolean{
        let contaOrigem = this.consultarConta(numOrigem);
        let contaDestino = this.consultarConta(numDestino);

        if(contaOrigem == null || contaDestino == null) return false;

        return contaOrigem.transferir(contaDestino, valor);
    }

    private consultarIndiceConta(numeroConta: string): number {
        for (let i = 0; i < this.contas.length; i++) {
            let conta = this.contas[i];
            if (conta!.numero == numeroConta) {
                return i;
            }
        }
        return -1
    }

    private consultarIndiceCliente(cpf: string): number {
        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i]!.cpf == cpf) {
                return i;
            }
        }
        return -1
    }

    excluirConta(num: string): void{
        let conta = this.consultarConta(num);

        if(conta == null) return;

        if(conta.cliente != null){
            conta.cliente.removerConta(num);
        }
        
        let indice = this.consultarIndiceConta(num);

        for(let i = indice; i < this.contas.length - 1; i++){
            this.contas[i] = this.contas[i+1]!;
            this.contas.pop();
        }
    }

    excluirCliente(cpf: string): void{
        let cliente = this.consultarCliente(cpf);

        if(cliente == null) return;

        for(let c of cliente.contas){
            cliente.removerConta(c.numero);
        }

        let indice = this.consultarIndiceCliente(cpf);

        for(let i = indice; i < this.clientes.length - 1; i++){
            this.clientes[i] = this.clientes[i+1]!;
            this.clientes.pop();
        }
    }

    transferirParaVarias(origem: string, destinos: string[], valor:number): void{
        let contaOrigem = this.consultarConta(origem);

        if(contaOrigem == null) return;

        for(let i = 0; i < destinos.length; i++){
            let contaDestino = this.consultarConta(destinos[i]!);

            if(contaDestino == null) continue;

            this.transferir(origem, destinos[i]!, valor);
        }
    }

    quantidadeContas(): number{
        return this.contas.length;
    }

    totalDepositado(): number{
        let saldo = 0;

        for(let c of this.contas) saldo += c.saldo;

        return saldo;
    }

    mediaSaldoContas(): number{
        if(this.quantidadeContas() > 0) return this.totalDepositado() / this.quantidadeContas();
        else return 0;
    }

    mudarTitulariedade(numero: string, novocpf: string): void{
        let conta = this.consultarConta(numero);
        let cliente = this.consultarCliente(novocpf);

        if(conta == null || cliente == null) return;

        if(conta.cliente == cliente) return;

        if(conta.cliente != null) conta.cliente?.removerConta(conta.numero);
        this.associarContaCliente(numero, novocpf);
    }

    listarContasSemCliente(): Conta[]{
        let contasSemCliente: Conta[] = [];

        for(let c of this.contas) if(c.cliente == null) contasSemCliente.push(c);

        return contasSemCliente;
    }

    carregarDados(): void{
        let c1 = new Cliente(1, "Ana", "1.1-1", new Date(1990, 1, 10));
        this.inserirCliente(c1);
        let c2 = new Cliente(2, "Pedro", "6.7-0", new Date(2000,6,30));
        this.inserirCliente(c2);
        let c3 = new Cliente(3, "José", "9.7-1", new Date(1983, 4, 29));
        this.inserirCliente(c3);
        let c4 = new Cliente(4, "Maria", "6.6-6", new Date(1978, 11, 30));
        this.inserirCliente(c4);
        let c5 = new Cliente(5, "Fernado", "0.8-7", new Date(2005, 8, 13));
        this.inserirCliente(c5);
        let k1 = new Conta(1, "1001", 500, new Date(2010,2,10), c1);
        this.inserirConta(k1);
        let k2 = new Conta(2, "1002", 1000, new Date(2020,1,1), c1);
        this.inserirConta(k2);
        let k3 = new Conta(3, "1090", 150, new Date(2020,1,1), c2);
        this.inserirConta(k3);
        let k4 = new Conta(4, "1100", 5000, new Date(2008, 9, 18), null);
        this.inserirConta(k4);
        let k5 = new Conta(5, "1190", 0, new Date(2009, 10, 26), null);
        this.inserirConta(k5);
    }
}