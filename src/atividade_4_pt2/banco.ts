import fs from "node:fs/promises";
import path from "node:path";

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

    constructor(id:number, numero:string, saldo: number, cliente: Cliente|null){
        this._id = id;
        this._numero = numero;
        this._saldo  = saldo;
        this._cliente = cliente;
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

export class ContaPoupanca extends Conta{
    private _taxaJuros : number;

    constructor(id:number, numero:string, saldo: number, cliente: Cliente|null, taxaJuros:number){
        super(id, numero, saldo, cliente);
        this._taxaJuros = taxaJuros;
    }

    public renderJuros(): void{
        this.depositar(this.saldo * this._taxaJuros/100)
    }

    get taxaJuros(): number{
        return this._taxaJuros;
    }
}

export class ContaImposto extends Conta{
    private _taxaDesconto : number;

    constructor(id:number, numero:string, saldo: number, cliente: Cliente|null, taxaDesconto:number){
        super(id, numero, saldo, cliente);
        this._taxaDesconto = taxaDesconto;
    }

    sacar(valor: number): boolean{
        if(valor <= 0) return false;
        if(valor + valor * this._taxaDesconto/100 > this.saldo) return false;
        return super.sacar(valor + valor * this._taxaDesconto/100);
    }

    get taxaDesconto(): number{
        return this._taxaDesconto;
    }
}

export class ContaBonus extends Conta{
    private _taxaBonus : number;
    
    constructor(id:number, numero:string, saldo: number, cliente: Cliente|null, taxaBonus: number){
        super(id, numero, saldo, cliente);
        this._taxaBonus = taxaBonus;
    }

    depositar(valor: number): boolean {
        if(valor <= 0) return false;
        let valorBonus : number = valor * this._taxaBonus;
        return super.depositar(valor + valorBonus);
    }

    get taxaBonus(): number{
        return this._taxaBonus;
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
        let k1 = new Conta(1, "1001", 500, c1);
        this.inserirConta(k1);
        let k2 = new Conta(2, "1002", 1000, c1);
        this.inserirConta(k2);
        let k3 = new Conta(3, "1090", 150, c2);
        this.inserirConta(k3);
        let k4 = new Conta(4, "1100", 5000, null);
        this.inserirConta(k4);
        let k5 = new Conta(5, "1190", 0, null);
        this.inserirConta(k5);
    }

    renderJuros(numero: string): void{
        let conta = this.consultarConta(numero);

        if(conta == null) return;

        if(conta instanceof ContaPoupanca){
            conta.renderJuros();
        }
    }

    async carregarContas(): Promise<void>{
        const dir = path.resolve(process.cwd(), "src\\atividade_4_pt2");
        const filePath = path.join(dir, "contas.txt");
        const texto: string = await fs.readFile(filePath, "utf-8");

        if(texto.length == 0) {
            this.carregarDados();
            return;
        }

        const linhas = texto.split(/\r?\n/);

        let campos;
        let tipo;
        let id;
        let numero;
        let saldo;
        let cliente;
        
        for(let linha of linhas){
            campos = linha.split(";");
            if(campos.length < 5) continue;
            tipo = campos[0];
            id = Number(campos[1]);
            numero = campos[2]!;
            saldo = Number(campos[3]);
            cliente = this.consultarCliente(campos[4]!);

            switch(tipo){
                case "C": 
                    let conta : Conta = new Conta(id, numero, saldo, cliente);
                    this.inserirConta(conta);
                    break;
                case "CB":
                    if(campos.length != 6) continue;
                    let taxaBonus = Number(campos[5]);
                    let contaBonus : ContaBonus = new ContaBonus(id, numero, saldo, cliente, taxaBonus);
                    this.inserirConta(contaBonus);
                    break;
                case "CP":
                    if(campos.length != 6) continue;
                    let taxaJuros = Number(campos[5]);
                    let contaPoupanca : ContaPoupanca = new ContaPoupanca(id, numero, saldo, cliente, taxaJuros);
                    this.inserirConta(contaPoupanca);
                    break;
                case "CI":
                    if(campos.length != 6) continue;
                    let taxaDesconto = Number(campos[5]);
                    let contaImposto : ContaImposto = new ContaImposto(id, numero, saldo, cliente, taxaDesconto);
                    this.inserirConta(contaImposto);
            }
        }
    }

    async salvarContas(): Promise<void>{
        const dir = path.resolve(process.cwd(), "src\\atividade_4_pt2");
        const filePath = path.join(dir, "contas.txt");

        let linhas : string = '';

        for(let conta of this.contas){
            let refcliente : string | null;

            if(conta.cliente != null) refcliente = conta.cliente.cpf;
            else refcliente = null;

            if(conta instanceof ContaPoupanca){
                linhas += `CP;${conta.id};${conta.numero};${conta.saldo};${refcliente};${conta.taxaJuros}\n` 
            } else if (conta instanceof ContaImposto){
                linhas += `CI;${conta.id};${conta.numero};${conta.saldo};${refcliente};${conta.taxaDesconto}\n` 
            } else if(conta instanceof ContaBonus){
                linhas += `CB;${conta.id};${conta.numero};${conta.saldo};${refcliente};${conta.taxaBonus}\n` 
            } else {
                linhas += `C;${conta.id};${conta.numero};${conta.saldo};${refcliente}\n` 
            }
        }

        await fs.writeFile(filePath, linhas,"utf-8");
    }    
}