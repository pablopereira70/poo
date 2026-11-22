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