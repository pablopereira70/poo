### Este `readme` contém soluções da lista de exercícios de typescript

### Questão 1

Assinale V ou F:

( F ) Objetos são modelos para classes;

( F ) Atributos de uma classe devem ser obrigatoriamente inicializados para que as
classes compilem;

( F ) Uma variável declarada dentro de um método deve ser inicializada para que a
classe seja compilável;

( F ) Uma variável que seja uma classe declarada em um método é automaticamente
inicializada com undefined;

( V ) Construtores são rotinas especiais que servem para inicializar e configurar os
objetos no momento da instanciação;

( V ) Construtores não possuem tipo de retorno e podem ou não ter parâmetros;

( V ) Uma classe pode ter várias instâncias.

### Questão 2

```typescript
class Hotel {
quantReservas : number;
adicionarReserva() : void {
this.quantReservas++;
}
}

let h1: Hotel = new Hotel;
h1.quantReservas = 1;
h1.adicionarReserva();
console.log(h1);

let h2: Hotel = new Hotel;
console.log(h2);
h2.adicionarReserva();
console.log(h2);

let h3 : Hotel = new Hotel;
console.log(h3.quantReservas);
```

[Ver código](questao_2.ts)

#### Saída

```Powershell
src/atividade_3/questao_2.ts:2:1 - error TS2564: Property 'quantReservas' has no initializer and is not definitely assigned in the constructor.

2 quantReservas : number;
  ~~~~~~~~~~~~~


Found 1 error in src/atividade_3/questao_2.ts:2
```

O código gera um erro de compilação pois o atributo `quantReservas` não foi inicializado

### Questão 3

#### Solução

```typescript
class Hotel {
quantReservas : number;
constructor (quantReservas : number) {
    this.quantReservas = quantReservas;
    }
adicionarReserva() : void {
this.quantReservas++;
    }
}

let hotel : Hotel = new Hotel(2);
console.log(hotel.quantReservas);
```

[Ver código](questao_3.ts)

### Questão 4

```typescript
class Radio {
volume : number;
constructor(volume : number) {
this.volume = volume;

    }
}

let r : Radio = new Radio();
r.volume = 10;
```

#### Saída

```Powershell
src/atividade_3/questao_4.ts:8:17 - error TS2554: Expected 1 arguments, but got 0.

8 let r : Radio = new Radio();
                  ~~~~~~~~~~~

  src/atividade_3/questao_4.ts:3:13 - An argument for 'volume' was not provided.
    3 constructor(volume : number) {
                  ~~~~~~~~~~~~~~~


Found 1 error in src/atividade_3/questao_4.ts:8
```

O código quebra pois construtor exige que ao iniciar um objeto do tipo `Radio`, seus atributos sejam passados.

#### Solução

```typescript
class Radio {
volume : number;
constructor(volume : number) {
this.volume = volume;

    }
}

let r : Radio = new Radio(10); // passa o atributo ao iniciar o objeto
```

[Ver código](./questao_4.ts)

### Questão 5

```typescript
class Conta {
numero: string;
saldo: number;

constructor(numero: string, saldo: number) {
this.numero = numero;
this.saldo = saldo;
    }

sacar(valor: number): void {
this.saldo = this.saldo - valor;
    }

depositar(valor: number): void {
this.saldo = this.saldo + valor;
    }

transferir(ContaDestino: Conta, valor: number): void {
    this.saldo = this.saldo - valor;
    ContaDestino.saldo = ContaDestino.saldo + valor;
    }

consultarSaldo(): number {
return this.saldo;
    }
}

let c1: Conta = new Conta("1",100);
let c2: Conta = new Conta("2",100);
let c3: Conta;
c1 = c2;
c3 = c1;
c1.sacar(10);
c1.transferir(c2,50);
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
console.log(c3.consultarSaldo());
```

[Ver código](questao_5.ts)

#### Saída

```Powershell
90
90
90
```

a) todos os "prints" exibem `90` porque todos os objetos apontam para mesma referência.

b)  ele fica inutilizado, pois o ponteiro que apontava para `c1` agora aponta para `c2`. Se necessário ele será excluído pelo coletor de lixo.

### Questão 6

```typescript
class Triangulo {
    a: number;
    b: number;
    c: number;

    constructor(a:number, b:number, c:number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    ehTriangulo(): boolean {
        return this.b + this.c > this.a &&
               this.a + this.c > this.b &&
               this.a + this.b > this.c;
    }

    ehEquilatero(): boolean {
        return this.ehTriangulo() &&
               this.a == this.b &&
               this.b == this.c;
    }

    ehEscaleno(): boolean {
        return this.ehTriangulo() &&
               this.a != this.b &&
               this.b != this.c &&
               this.a != this.c;
    }

    ehIsoceles(): boolean {
        return this.ehTriangulo() &&
               !this.ehEscaleno() &&
               !this.ehEquilatero();
    }
}

let t1 = new Triangulo(10,3,4); // Triangulo Invalido
console.log(t1.ehTriangulo());
console.log(t1.ehEquilatero());
console.log(t1.ehEscaleno());
console.log(t1.ehIsoceles());

let t2 = new Triangulo(5, 5, 5); // Triangulo Equilatero
console.log(t2.ehTriangulo());    
console.log(t2.ehEquilatero());   
console.log(t2.ehEscaleno());     
console.log(t2.ehIsoceles()); 

let t3 = new Triangulo(3, 4, 5); // Triangulo Escaleno
console.log(t3.ehTriangulo());    
console.log(t3.ehEquilatero());   
console.log(t3.ehEscaleno());     
console.log(t3.ehIsoceles());

let t4 = new Triangulo(5, 5, 8); // Triangulo Isoceles
console.log(t4.ehTriangulo());    
console.log(t4.ehEquilatero());   
console.log(t4.ehEscaleno());     
console.log(t4.ehIsoceles());     
```

#### Saída

```Powershell
false
false
false
false
true
true
false
false
true
false
true
false
true
false
false
true
```