import { Banco, Conta, Cliente, ContaPoupanca, ContaImposto, ContaBonus } from "./banco";
import promptSync = require("prompt-sync");

const input = promptSync();

class App {
    private b: Banco;

    constructor() {
        this.b = new Banco();
    }

    async inicializar(): Promise<void> {
        await this.b.carregarContas();
        await this.menu();
    }

    // ---------- helpers ----------
    private lerNumero(msg: string): number {
        return Number(input(msg).replace(",", ".")) || 0;
    }

    private lerData(msg: string): Date {
        const s = input(msg); // formato dd/mm/aaaa
        const [d, m, a] = s.split("/").map(Number);
        if (!d || !m || !a) return new Date();
        return new Date(a, m - 1, d);
    }

    // ---------- menu ----------
    async menu(): Promise<void> {
        let opcao = "";
        do {
            console.log(`
===== MENU =====
Contas:
00 Inserir         01 Consultar       02 Sacar
03 Depositar       04 Excluir         05 Transferir
06 Totalizações    07 Render Juros    08 Contas sem cliente

Clientes:
20 Inserir         21 Consultar       22 Associar
23 Excluir         24 Mudar titularidade
25 Transferir para várias

0  Sair            1 SalvarContas
================`);
            opcao = input("Opção: ").trim();
            switch (opcao) {
                case "00": this.inserirConta(); break;
                case "01": this.consultarConta(); break;
                case "02": this.sacarConta(); break;
                case "03": this.depositarConta(); break;
                case "04": this.excluirConta(); break;
                case "05": this.transferirConta(); break;
                case "06": this.totalizacoes(); break;
                case "07": this.renderJuros(); break;
                case "08": this.listarSemCliente(); break;
                case "20": this.inserirCliente(); break;
                case "21": this.consultarCliente(); break;
                case "22": this.associarContaCliente(); break;
                case "23": this.excluirCliente(); break;
                case "24": this.mudarTitularidade(); break;
                case "25": this.transferirParaVarias(); break;
                case "1" : this.salvarContas(); break;
                case "0": console.log("Encerrando..."); break;
                default: console.log("Opção inválida.");
            }
        } while (opcao !== "0");
        this.salvarContas();
    }

    // ---------- contas ----------
    private inserirConta(): void {
        console.log("Tipo de conta: enter=Comum | 1=Poupança | 2=Com Imposto | 3=Com Bônus");
        const tipo = input("Escolha (enter/1/2/3): ").trim();

        const id = this.lerNumero("id: ");
        const numero = input("numero: ").trim();
        const saldo = this.lerNumero("saldo inicial: ");
        const cpf = input("CPF do titular (enter = nenhum): ").trim();

        let conta: Conta;

        switch (tipo) {
            case "1": { // Poupança
                const taxaJuros = this.lerNumero("taxa de juros (% a.m.): ");
                conta = new ContaPoupanca(id, numero, saldo, null, taxaJuros);
                break;
            }
            case "2": { // Com Imposto
                const taxaDesconto = this.lerNumero("taxa de desconto no saque (%): ");
                conta = new ContaImposto(id, numero, saldo, null, taxaDesconto);
                break;
            }
            case "3": { // Com Bônus
                const taxaBonus = this.lerNumero("taxa de bônus no deposito (%): ");
                conta = new ContaBonus(id, numero, saldo, null, taxaBonus);
                break;
            }
            default: // Comum
                conta = new Conta(id, numero, saldo, null);
        }

        this.b.inserirConta(conta);

        if (cpf) this.b.associarContaCliente(numero, cpf);
        console.log("Conta inserida.");
    }

    private consultarConta(): void {
        const numero = input("numero: ").trim();
        const c = this.b.consultarConta(numero);
        if (c == null) { console.log("Conta não encontrada."); return; }
        console.log(`id=${c.id} numero=${c.numero} saldo=${c.saldo} ` +
                    `titular=${c.cliente ? c.cliente.cpf : "(nenhum)"}`);
    }

    private sacarConta(): void {
        const numero = input("numero: ").trim();
        const valor = this.lerNumero("valor: ");
        console.log(this.b.sacar(numero, valor) ? "Saque OK." : "Saque recusado.");
    }

    private depositarConta(): void {
        const numero = input("numero: ").trim();
        const valor = this.lerNumero("valor: ");
        console.log(this.b.depositar(numero, valor) ? "Depósito OK." : "Depósito recusado.");
    }

    private excluirConta(): void {
        const numero = input("numero: ").trim();
        this.b.excluirConta(numero);
        console.log("Conta excluída (se existia).");
    }

    private transferirConta(): void {
        const origem = input("numero origem: ").trim();
        const destino = input("numero destino: ").trim();
        const valor = this.lerNumero("valor: ");
        console.log(this.b.transferir(origem, destino, valor) ? "Transferência OK." : "Transferência recusada.");
    }

    private totalizacoes(): void {
        console.log(`Contas: ${this.b.quantidadeContas()}`);
        console.log(`Total depositado: ${this.b.totalDepositado().toFixed(2)}`);
        console.log(`Média por conta: ${this.b.mediaSaldoContas().toFixed(2)}`);
    }

    private listarSemCliente(): void {
        const lista = this.b.listarContasSemCliente();
        if (lista.length === 0) { console.log("Nenhuma conta sem cliente."); return; }
        for (let c of lista) console.log(`numero=${c.numero} saldo=${c.saldo}`);

        if (input("Atribuir titular? (s/n): ").trim().toLowerCase() === "s") {
            const cpf = input("CPF do cliente: ").trim();
            for(let c of lista) this.b.associarContaCliente(c.numero, cpf);
        }
    }

    // ---------- clientes ----------
    private inserirCliente(): void {
        const id = this.lerNumero("id: ");
        const nome = input("nome: ").trim();
        const cpf = input("cpf: ").trim();
        const data = this.lerData("data de nascimento (dd/mm/aaaa): ");
        this.b.inserirCliente(new Cliente(id, nome, cpf, data));
        console.log("Cliente inserido.");
    }

    private consultarCliente(): void {
        const cpf = input("cpf: ").trim();
        const c = this.b.consultarCliente(cpf);
        if (c == null) { console.log("Cliente não encontrado."); return; }
        const contas = this.b.listarContasCliente(cpf);
        console.log(`id=${c.id} cpf=${c.cpf} contas=${contas.length} ` +
                    `saldo total=${this.b.totalizarSaldoCliente(cpf).toFixed(2)}`);
        for (let k of contas) console.log(`  -> ${k.numero} (saldo ${k.saldo})`);
    }

    private associarContaCliente(): void {
        const numero = input("numero da conta: ").trim();
        const cpf = input("cpf do cliente: ").trim();
        this.b.associarContaCliente(numero, cpf);
        console.log("Associação tentada.");
    }

    private excluirCliente(): void {
        const cpf = input("cpf: ").trim();
        this.b.excluirCliente(cpf);
        console.log("Cliente excluído (contas ficaram sem titular).");
    }

    private mudarTitularidade(): void {
        const numero = input("numero da conta: ").trim();
        const cpf = input("cpf do novo titular: ").trim();
        this.b.mudarTitulariedade(numero, cpf);
        console.log("Titularidade alterada (se possível).");
    }

    private transferirParaVarias(): void {
        const origem = input("numero origem: ").trim();
        const valor = this.lerNumero("valor por destino: ");
        const destinos = input("numeros destino (separados por vírgula): ")
            .split(",").map(s => s.trim()).filter(s => s.length > 0);
        this.b.transferirParaVarias(origem, destinos, valor);
        console.log("Transferências processadas.");
    }

    private renderJuros(): void{
        const numero = input("numero da conta: ").trim();
        this.b.renderJuros(numero);
        console.log("Rendimento tentado.");
    }

    private salvarContas(): void{
        this.b.salvarContas();
        console.log("Salvando contas...");
    }
}

const app = new App();
app.inicializar();