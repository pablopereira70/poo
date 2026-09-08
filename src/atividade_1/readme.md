#### Este `readme` contém as soluções da lista de exercícios em Typescript.

# Parte 1 – Preparação do ambiente TypeScript

### Script da questão 1

```typescript
console.log("Hello, World!");
```

 [Ver código](questao_1.ts)
 ### Saída em TS

```
Hello, World!
```

 ### Saída em JS

```
Hello, World!
```

# Parte 2 – TypeScript básico

### Script da questão 2

```typescript
let idade: number = "2";
console.log(idade);
```

[Ver código](./questao_2.ts)

 ### Saída em TS

```
error TS2322: Type 'string' is not assignable to type 'number'.
```

 ### Saída em JS

```
2
```
---
### Script da questão 3

```typescript
let nome = "Ely";
console.log(typeof(nome));
```

[Ver código](./questao_3.ts)

 ### Saída em TS

```
string
```

 ### Saída em JS

```
string
```

---

### Scripts da questão 4

 ### Exemplo 1

```typescript
let a = 10;
let b = "5";

console.log(a + b);
```

[Ver código](./questao_4a.ts)

 ### Saída em TS

```
105
```

 ### Saída em JS

```
105
```

---

### Exemplo 2

```typescript
let x = true;
let y = 2;

console.log(x + y);
```
[Ver código](questao_4b.ts)

### Saída em TS

```
error TS2365: Operator '+' cannot be applied to types 'boolean' and 'number'.
```

 ### Saída em JS

```
3
```

---

### Exemplo 3

```typescript
console.log(0 == false);
console.log("" == false);
console.log(null == undefined);
```
[Ver código](./questao_4c.ts)

### Saída em TS

```
error TS2367: This comparison appears to be unintentional because the types 'string' and 'boolean' have no overlap.
```

### Saída em JS

```
true
true
true
```
---

### Comentários da questão 5

 No TypeScript, o primeiro exemplo é aceito porque o operador `+` permite a concatenação entre `number` e `string`.

 O segundo exemplo apresenta erro porque não é permitido somar diretamente um `boolean` com um `number`.

 As comparações com `==` também podem gerar erros de incompatibilidade dependendo da versão do TypeScript e das configurações do projeto.

 A principal diferença é que o TypeScript verifica os tipos durante a compilação, enquanto o JavaScript realiza conversões automaticamente durante a execução.

---

 ### Script da questão 6

```typescript
let nome: string = "Ely";
let salario: number = 2000;
let linguagem: string = "TypeScript";

console.log(`${nome}
My salary is ${salario}
and
my preffered language is ${linguagem}`);
```

[Ver código](questao_6.ts)

 ### Saída em TS

```
Ely
My salary is 2000.00
and
my preffered language is TypeScript
```

 ### Saída em JS

```
Ely
My salary is 2000.00
and
my preffered language is TypeScript
```

---

 ### Scripts da questão 7

### Questão 7a

```typescript
let mensagem: string = "TypeScript É MUITO LEGAL!";

console.log(mensagem.toUpperCase());
console.log(mensagem.length);
```
[Ver código](questao_7a.ts)

 ### Saída em TS

```
TYPESCRIPT É MUITO LEGAL!
24
```

 ### Saída em JS

```
TYPESCRIPT É MUITO LEGAL!
24
```

---

 ### Questão 7b

```typescript
let pi: number = 3.1415;

console.log(pi.toFixed(2));
```

[Ver código](questao_7b.ts)

 ### Saída em TS

```
3.14
```

 ### Saída em JS

```
3.14
```

 # Parte 3 – Objetos e classes

 ### Script da questão 8

```typescript
class Retangulo {
    base: number = 0;
    altura: number = 0;

    calcularArea(): number{
        return this.base * this.altura;
    }

    calcularPerimetro(): number{
        return 2 * this.base + 2 * this.altura;
    }
}

let retangulo = new Retangulo();
retangulo.base = 5;
retangulo.altura = 3;
console.log(retangulo.calcularArea());
console.log(retangulo.calcularPerimetro());
```

[Ver código](questao_8.ts)

 ### Saída em TS

```
15
16
```

 ### Saída em JS

```
15
16
```

---

### Script da questão 9

```typescript
class Circulo{
    raio: number = 0;
    pi: number = 3.14;

    calcularArea(): number{
        return this.pi * this.raio ** 2;
    }

    calcularPerimetro(): number{
        return 2 * this.pi * this.raio;
    }
}

let circulo = new Circulo();
circulo.raio = 6;
console.log(circulo.calcularArea());
console.log(circulo.calcularPerimetro());
```

[Ver código](questao_9.ts)

 ### Saída em TS

```
113.04
37.68
```

 ### Saída em JS

```
113.04
37.68
```

---

### Script da questão 10

```typescript
class SituacaoFinanceira {
    creditos: number = 0;
    debitos: number = 0;

    calcularSaldo():number {
        return this.creditos - this.debitos;
    }
}

let situacaoFinanceira = new SituacaoFinanceira();
situacaoFinanceira.creditos = 2000;
situacaoFinanceira.debitos = 750;
console.log(situacaoFinanceira.calcularSaldo());
```

 ### Saída em TS

```
1250
```

 ### Saída em JS

```
1250
```

---

### Script da questão 11

```typescript
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
```

 ### Saída em TS

```
Meu nome é Ely e tenho 46 anos.
```

 ### Saída em JS

```
Meu nome é Ely e tenho 46 anos.
```

---

### Script da questão 12

```typescript
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
```

 ### Saída em TS

```
Produto: Camisa, Preço: R$ 100,00
Desconto: 10% → Novo preço: R$ 90,00
```

 ### Saída em JS

```
Produto: Camisa, Preço: R$ 100,00
Desconto: 10% → Novo preço: R$ 90,00
```

---

### Script da questão 13

```typescript
class Numero {
    valor: number = 0;

    ehPar(): boolean{
        return this.valor % 2 == 0;
    }

    ehImpar(): boolean{
        return !this.ehPar();
    }
}

let numero = new Numero();
numero.valor = 10;
console.log(numero.ehPar());
console.log(numero.ehImpar());
```

 ### Saída em TS

```
true
false
```

 ### Saída em JS

```
true
false
```

 # Parte 4 – Configurações do TypeScript

### Script da questão 14

### Configuração

```json
{
"compilerOptions": {
    "rootDir": "./src",
    "outDir": "./build"
    }
}
```

---

### Script da questão 15

```typescript
function teste() {
    let x: number = 10;

    console.log("Início do programa");

    if (x > 5) {
        console.log("x é maior que 5");
        return;

        console.log("Essa linha é inatingível!");
    }

    console.log("Fim do programa");
}

teste();
```

[Ver código](./questao_15.ts)

 ### Configuração com `allowUnreachableCode: false`

```json
{
    "compilerOptions": {
        "allowUnreachableCode": false
    }
}
```

 ### Saída em TS

```
error TS7027: Unreachable code detected.
```

 O TypeScript identifica que:

```typescript
console.log("Essa linha é inatingível!");
```

 nunca será executado, pois existe um `return` imediatamente antes dela.

 ### Configuração com `allowUnreachableCode: true`

```json
{
    "compilerOptions": {
        "allowUnreachableCode": true
    }
}
```

 Nesse caso, o TypeScript permite a existência do código inatingível.

 ### Saída em JS

```
Início do programa
x é maior que 5
```

 A mensagem `"Essa linha é inatingível!"` nunca aparece porque o `return` encerra a função.

---

### Comentários da questão 16

 ### Configuração

```json
{
    "compilerOptions": {
        "noEmitOnError": true
    }
}
```

 Para testar, pode ser utilizado uma parte do script da questão 2:

```typescript
let idade: number = "2";
```

 Existe um erro de tipo porque uma variável `number` recebeu uma `string`.

 ### Saída em TS

```
error TS2322: Type 'string' is not assignable to type 'number'.
```

 Com:

```json
"noEmitOnError": true
```

 o TypeScript **não gera o arquivo JavaScript quando existem erros de compilação**.

 Se o arquivo `script.js` for apagado e o TypeScript for alterado novamente, o JavaScript não será criado enquanto o erro continuar.

 Com:

```json
"noEmitOnError": false
```

 o TypeScript pode gerar o JavaScript mesmo existindo erros de tipo.

 ### Saída em JS

 Com `noEmitOnError: true` e erro de compilação:

```
Nenhum arquivo JavaScript é gerado.
```

---

### Script da questão 17

```typescript
let valor;

valor = 10;
valor = "teste";

console.log(valor);

let outroValor: number;

outroValor = 20;

console.log(outroValor);
```

[Ver código](./questao_17.ts)

 ### Configuração com `noImplicitAny: false`

```json
{
    "compilerOptions": {
        "noImplicitAny": false
    }
}
```

 ### Saída em TS

```
teste
20
```

 ### Saída em JS

```
teste
20
```

 ### Configuração com `noImplicitAny: true`

```json
{
    "compilerOptions": {
        "noImplicitAny": true
    }
}
```

 Nesse exemplo, `valor` não possui um tipo explicitamente declarado. O TypeScript inicialmente trata a variável como um `any` evolutivo, permitindo que ela receba primeiro um número e depois uma string.

 Já `outroValor` foi declarado explicitamente como `number`, portanto só deve receber números.

 ### Comentário

 A opção `noImplicitAny` serve principalmente para impedir que o TypeScript aceite tipos `any` implícitos em situações em que ele consegue detectar essa declaração, como parâmetros de funções sem tipo. É uma configuração recomendada para tornar o código mais seguro.

---

### Script da questão 18

 ### Código TypeScript

```typescript
class Numero {
    valor: number = 0;

    ehPar(): boolean {
        return this.valor % 2 == 0;
    }

    ehImpar(): boolean {
        return !this.ehPar();
    }

    somar(outroNumero: number): number {
        return this.valor + outroNumero;
    }

    somarNumeros(outroNumero: Numero): Numero {
        let resultado: Numero = new Numero();

        resultado.valor = this.valor + outroNumero.valor;

        return resultado;
    }
}

let numero1 = new Numero();
numero1.valor = 10;

let numero2 = new Numero();
numero2.valor = 5;

console.log(numero1.ehPar());
console.log(numero1.ehImpar());
console.log(numero1.somar(5));

let resultado = numero1.somarNumeros(numero2);

console.log(resultado.valor);
```

[Ver código](questao_18.ts)

 O padrão ES3 foi descontinuado nas versões atuais do TypeScript. Portanto, não é possível utilizar atualmente:

```json
"target": "ES3"
```

 como alvo válido do compilador moderno.

 Para representar o resultado equivalente ao estilo antigo solicitado pela questão, a classe pode ser convertida para JavaScript utilizando uma construção de função e prototype:

```javascript
var Numero = /** @class */ (function () {
    function Numero() {
        this.valor = 0;
    }

    Numero.prototype.ehPar = function () {
        return this.valor % 2 == 0;
    };

    Numero.prototype.ehImpar = function () {
        return !this.ehPar();
    };

    Numero.prototype.somar = function (outroNumero) {
        return this.valor + outroNumero;
    };

    Numero.prototype.somarNumeros = function (outroNumero) {
        var resultado = new Numero();
        resultado.valor = this.valor + outroNumero.valor;
        return resultado;
    };

    return Numero;
}());
```

[Ver código](./questao_18js.js)

 ### Saída em TS

```
true
false
15
15
```

 ### Saída em JS

```
true
false
15
15
```

 A principal diferença é que o TypeScript moderno normalmente transpila classes para versões mais antigas do JavaScript utilizando funções construtoras e `prototype` quando o `target` é suficientemente antigo.

---

 ## Script da questão 19

```typescript
class Numero {
    valor: number = 0;

    ehPar(): boolean {
        return this.valor % 2 == 0;
    }

    ehImpar(): boolean {
        return !this.ehPar();
    }
}

let numero = new Numero();

numero.valor = 10;

console.log(numero.ehPar());
console.log(numero.ehImpar());
```

 ### Configuração do `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "sourceMap": true,
        "outDir": "./build"
    }
}
```

 A opção:

```json
"sourceMap": true
```

 faz com que o TypeScript gere um arquivo `.js.map` junto com o JavaScript.

 Por exemplo:

```
build/
├── script.js
└── script.js.map
```

 O arquivo `.map` permite que ferramentas de desenvolvimento, como o VS Code, relacionem o código JavaScript executado ao código TypeScript original.

 ### Saída em TS

```
true
false
```

 ### Saída em JS

```
true
false
```

 ### Resultado da configuração

 Depois de executar:

```
tsc
```

 serão gerados:

```
build/script.js
build/script.js.map
```

 Com o `sourceMap` habilitado, é possível colocar breakpoints diretamente no arquivo `.ts` e acompanhar a execução durante a depuração no VS Code.

---