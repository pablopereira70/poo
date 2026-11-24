### Este `readme` contém comentários da lista de exercícios de POO.

## Classe `Veiculo`, `Carro` e `CarroEletrico`
Objetivo:

Reescreva as classes usando herança para que os atributos duplicados não sejam mais necessários.

```typescript
// Script sem utilizar herança

class Veiculo{
    placa : string;
    ano : number;
}

class Carro{
    placa : string;
    ano : number;
    modelo : string;
}

class CarroEletrico{
    placa : string;
    ano : number;
    modelo : string;
    autonomiaBateria : number;
}
```

```typescript
// Script utilizando herança

class Veiculo{
    placa : string;
    ano : number;
}

class Carro extends Veiculo{
    modelo : string;
}

class CarroEletrico extends Carro{
    autonomiaBateria : number;
}
```

[Ver código](questao_1.ts)

## Classe `Calculadora`
Objetivos:

a. Dois tributos privados chamados representando dois operandos;

b. Crie um construtor que inicializa os atributos;

c. Crie um método que retorna a soma dos dois atributos;

d. Teste a classe.

```typescript
// resolução

class Calculadora{
    // requisito A
    private operando1: number;
    private operando2: number;

    // requisito B
    constructor(operando1:number, operando2: number){
        this.operando1 = operando1;
        this.operando2 = operando2;
    }

    // requisito C
    soma(): number{
        let soma = this.operando1 + this.operando2;
        this.operando2 = this.operando1;
        this.operando1 = soma;
        return soma;
    }
}

//requisito D
let calc : Calculadora = new Calculadora(20, 10);
console.log(calc.soma()) // 30
console.log(calc.soma()) // 50
```
[Ver código](questao_2.ts)

## Classe `CalculadoraCientifica`
Objetivos:

a. Implemente um método chamado exponenciar que retorne o primeiro
operando elevado ao segundo;

b. Teste a classe;

c. Foi necessária alguma modificação em Calculadora para o acesso aos
atributos?

```typescript
import { Calculadora } from "./questao_2";

class CalculadoraCientifica extends Calculadora{
    constructor(operando1:number, operando2:number){
        super(operando1, operando2);
    }

    // requisito A
    exponenciar(): number{
        let potencia : number = this.operando1 ** this.operando2
        this.operando1 = potencia;
        return potencia;
    }
}

// requisito B
let calc : CalculadoraCientifica = new CalculadoraCientifica(2, 2);
console.log(calc.exponenciar());
console.log(calc.exponenciar());
```

**requisito C**

Sim, a classe Calculadora teve que ser alterada para que fosse possível realizar a leitura e a gravação dos conteúdos dentro das variáveis. Sendo assim, foi feito a adição de metôdos get e set.

```typescript
export class Calculadora{
    // requisito A
    private _operando1: number;
    private _operando2: number;

    // requisito B
    constructor(operando1:number, operando2: number){
        this._operando1 = operando1;
        this._operando2 = operando2;
    }

    // requisito C
    soma(): number{
        let soma : number = this._operando1 + this._operando2;
        this._operando2 = this._operando1;
        this._operando1 = soma;
        return soma;
    }

    get operando1(): number{
        return this._operando1;
    }

    set operando1(operando1:number){
        this._operando1 = operando1;
    }

    get operando2(): number{
        return this._operando2;
    }

    set operando2(operando2:number){
        this._operando2 = operando2;
    }
}

//requisito D
// let calc : Calculadora = new Calculadora(20, 10);
// console.log(calc.soma())
// console.log(calc.soma())
```

[Ver código](questao_3.ts)

## Sistema Bancário
Objetivos:

a. Implemente na classe Banco o método renderJuros(numero: string): void.

b. Adicione a aplicação a possibilidade de ter o cadastro de ContaImposto
feita em sala de aula. Foi necessário alterar alguma coisa na classe Banco
ou apenas na classe App?

c. Incremente a implementação da aplicação para recuperar de um arquivo
texto para o array contas salvas em um arquivo contas.txt.

d. Implemente também uma funcionalidade de gravar no mesmo arquivo o
conteúdo do array de contas;

e. Pense e adicione outro tipo de conta com pelo menos um novo atributo e
um novo método. Exponha esse novo comportamento na classe Banco (se
necessário) e no menu da classe App.

```typescript
// metódo de renderJuros

renderJuros(numero: string): void{
        let conta = this.consultarConta(numero);

        if(conta == null) return;

        if(conta instanceof ContaPoupanca){
            conta.renderJuros();
        }
    }
```

Foi necessário alterar ambos os arquivos presentes na [atividade](../atividade_4_pt2/): 
- [banco.ts](../atividade_4_pt2/banco.ts) - recebeu a lógica do novo metódo e as suas regras.
- [app.ts](../atividade_4_pt2/app.ts) - foi atualizado a UI para permitir acesso as novas funcionalidades e ao cadastro dos novos tipos de conta.

> **obs:** essa questão mexe nos scripts de atividades anteriores

Para realizar a leitura e gravação de arquivos foi escolhida a biblioteca `node:fs/promises`:
- `fs.readfile()`: retorna o conteúdo completo do arquivo, caso o arquivo não exista ele cria.
- `fs.writefile()`: sobreescreve o conteúdo de um arquivo, caso o arquivo não exista ele cria.

```ts
// ler o arquivo

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

// gravar no arquivo

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
        } else{
            linhas += `C;${conta.id};${conta.numero};${conta.saldo};${refcliente}\n` 
        }
    }

    await fs.writeFile(filePath, linhas,"utf-8");
}   
```

Implementei a `ContaBonus` que ao ser depositado uma quantia nela é somado um valor bônus, segue a implementação:

```ts
class ContaBonus extends Conta{
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
```

## Sistema de Controle de Estoque
Objetivos:

a. Duas classes: Produto e ProdutoPerecivel;

b. A classe Produto tem atributos privados representando identificador,
descrição, quantidade de produtos em estoque e valor unitário;

c. ProdutoPerecivel tem as mesmas características de Produto, porém possui
a mais um atributo representando a data da validade. Use herança;

d. Produto possui dois métodos para repor e dar baixa. A e ambos somam e
subtraem respectivamente uma quatidade passada por parâmetro do
atributo quantidade;

e. Um produto perecível possui um método que diz se um produto está válido
ou não comparando sua data de validade com a data atual;

f. Use sobrescrita, ou seja, reescreva os métodos repor e dar baixa para que
não seja possível executar a ação caso o produto não esteja na validade;

g. Crie uma classe chamada Estoque que possui um atributo privado
representando um array de produtos (Produto ou ProdutoPerecivel);

h. Implemente métodos para inserir, consultar pelo atributo id, excluir, repor e
dar baixa nos produtos na classe estoque;
i. Crie validações para não deixar serem incluídos produtos com mesmo id ou
mesma descrição. Para isso, crie uma consulta adicional através de um
método existe(id: number, descricao: string): boolean e use-o no método
incluir;

j. Os métodos repor e dar baixa na classe estoque chamam os métodos da
classe produto finalmente alterar a quantidade;

k. Os vários métodos da classe devem levar em conta se o produto existe,
para isso, use o método existe ou consultar;

l. Implemente um método que liste todos os produtos perecíveis vencidos.

```ts
// Implementação da classe produto com os seus respectivos metódos

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
        this._quantidade -= quantidade;
    }
}
```

```ts
// Implementação da classe Produto Perêcivel com os seus respectivos metódos

class ProdutoPerecivel extends Produto{
    private _dataValidade: Date;

    constructor(id: number, descricao: string, quantidade: number, valorUnitario: number, data: Date){
        super(id, descricao, quantidade, valorUnitario);
        this._dataValidade = data;
    }

    ehValido(): boolean{
        if(this._dataValidade < new Date()) return true;
        else return false;
    }

    repor(quantidade: number): void{
        if(this.ehValido()) super.repor(quantidade);
    }

    darBaixa(quantidade: number): void{
        if(this.ehValido()) super.darBaixa(quantidade);
    }
}
```

```ts
// Implementação da classe Estoque

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

    listarVencidos(): Produto[]{
        let vencidos = [];

        for(let p of this.produtos){
            if(p instanceof ProdutoPerecivel && !p.ehValido()){
                vencidos.push(p);
            }
        }

        return vencidos;
    }
}
```

[Ver código](questao_5.ts)

---

Desenvolvido por Pablo Pereira 🧑‍💻