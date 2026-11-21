### Este `readme` contém a resolução da lista de exercícios de POO.

## 1. Classe `Calculadora`
Objetivos:

a. Dois atributos privados (operando1 e 2) do tipo number;

b. Dois métodos públicos, cada um representando uma operação básica;

c. Um construtor onde são passados os operandos e que esses inicializam os
atributos;

[Ver código](questao_1.ts)

```typescript
class Calculadora{
    // requisito A
    private operando1: number;
    private operando2: number;

    // requisito C
    constructor(operando1:number, operando2: number){
        this.operando1 = operando1;
        this.operando2 = operando2;
    }

    // requisito B
    soma(): number{
        let soma = this.operando1 + this.operando2;
        this.operando2 = this.operando1;
        this.operando1 = soma;
        return soma;
    }
    
    
    subtracao(): number{
        let subtracao = this.operando1 - this.operando2;
        this.operando2 = this.operando1;
        this.operando1 = subtracao;
        return subtracao;
    }
}

let calc : Calculadora = new Calculadora(1, 10);
console.log(calc.operando1); // erro
console.log(calc.soma());
console.log(calc.subtracao());
```

Tentei acessar os atributos da classe `Calculadora` mas por serem privados eles não são acessíveis diretamente.

```Powershell
src/atividade_5/questão_1.ts:26:18 - error TS2341: Property 'operando1' is private and only accessible within class 'Calculadora'.

26 console.log(calc.operando1);
                    ~~~~~~~~~


Found 1 error in src/atividade_5/questão_1.ts:26
```

## 2. Classe `Hora`
Objetivos:

a. Três atributos privados e definidos no construtor chamados hora, minutos e
segundos;

b. Métodos públicos para ler hora, minuto e segundo de forma individual;

c. Um método público para retorne a hora no formato “hh:mm:ss”.

[Ver código](questao_2.ts)

```typescript
class Hora{
    // requisito A
    private _hora: number;
    private _minuto: number;
    private _segundo: number;

    constructor(hora: number, minuto: number, segundo: number){
        this._segundo = segundo % 60; 
        this._minuto = (minuto + 
            Math.trunc(segundo / 60)) 
            % 60;
        this._hora = hora + Math.trunc(
            Math.trunc(minuto + 
                Math.trunc(segundo / 60)) 
                / 60);
    }

    // requisito B
    get hora(): number{
        return this._hora;
    }

    get minuto(): number{
        return this._minuto;
    }

    get segundo(): number{
        return this._segundo;
    }
    
    // requisito C
    horario(): string{
        return `${this._hora}:${this._minuto}:${this.segundo}`;
    }
}

let hora1 : Hora = new Hora(127,71,23);
console.log(hora1.hora);
console.log(hora1.minuto);
console.log(hora1.segundo);
console.log(hora1.horario());
```

> **obs:** os pontos 3, 4 e 5 já foram implementados na atividade anterior ([Ver atividade](../atividade_4_pt2/)).