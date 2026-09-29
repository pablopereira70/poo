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

[Ver código](questao_6.ts)

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

### Questão 7

```typescript
class Equipamento {
    ligado : boolean = false;

    ligar(): void {
        if(!this.ligado) {
            this.ligado = true;
        }
    }

    desligar(): void {
        if(this.ligado) {
            this.ligado = false;
        }
    }

    inverter(): void {
        this.ligado = !this.ligado;
    }

    estaLigado(): boolean {
        if(this.ligado) {
            return true;
        } else {
            return false;
        }
    }
}

let e1 : Equipamento = new Equipamento();
console.log(e1.estaLigado());
e1.ligar();
console.log(e1.estaLigado());
e1.desligar();
console.log(e1.estaLigado());
e1.inverter();
console.log(e1.estaLigado());
```

[Ver código](questao_7.ts)

#### Saída

```powershell
false
true
false
true
```

### Questão 8

```typescript
class Conta {
numero: string;
saldo: number;

constructor(numero: string, saldo: number) {
this.numero = numero;
this.saldo = saldo;
    }

sacar(valor: number): boolean {
    let resto = this.saldo - valor;
    
    if(!(resto < 0)) {
        this.saldo = resto;
        return true;
        }
    return false;
    }

depositar(valor: number): void {
    this.saldo = this.saldo + valor;
    }

transferir(ContaDestino: Conta, valor: number): boolean {
    if(this.sacar(valor)) {
        ContaDestino.depositar(valor);
        return true;
        }
    return false;
    }

consultarSaldo(): number {
    return this.saldo;
    }
}

const c1 = new Conta("1111-1", 1000);
const c2 = new Conta("2222-2", 500);

console.log(c1);
console.log(c2);

console.log(c1.sacar(300));         
console.log(c1.consultarSaldo());

console.log(c1.sacar(5000));         
console.log(c1.consultarSaldo());

c2.depositar(200);
console.log(c2.consultarSaldo());

console.log(c1.transferir(c2, 400));  
console.log(c1.consultarSaldo()); 
console.log(c2.consultarSaldo());

console.log(c1.transferir(c2, 10000)); 
console.log(c1.consultarSaldo()); 
console.log(c2.consultarSaldo()); 

console.log(c1.sacar(c1.consultarSaldo()));           
console.log(c1.consultarSaldo()); 
```

[Ver código](questao_8.ts)

#### Saída

```powershell
Conta { numero: '1111-1', saldo: 1000 }
Conta { numero: '2222-2', saldo: 500 }
true
700
false
700
700
true
300
1100
false
300
1100
true
0
```

### Questão 9

Para operações mais críticas, como operações financeiras, retornar `true` ou `false` é essencial porque o chamador precisa saber se a operação foi concluída. Já ações simples como atacar um jogador morto podem ser ignoradas pelo jogo.

### Questão 10

```typescript
class Jogador {
    forca : number;
    nivel : number;
    pontos_atuais : number;

    constructor(forca:number, nivel:number, pontos_atuais:number) {
        this.forca = forca;
        this.nivel = nivel;
        this.pontos_atuais = pontos_atuais;
    }

    calcularAtaque(): number {
        return this.forca * this.nivel;
    }

    atacar(atacado: Jogador): void {
        if(atacado.estaVivo()) {
            atacado.pontos_atuais = atacado.pontos_atuais - this.calcularAtaque();
        }
    }

    estaVivo(): boolean {
        return this.pontos_atuais > 0;
    }
}

let j1 : Jogador = new Jogador(10, 5, 100);
let j2 : Jogador = new Jogador(20, 1, 80);

console.log(j1);
console.log(j2);

console.log(j1.calcularAtaque());
console.log(j2.calcularAtaque());

j1.atacar(j2);
j2.atacar(j1);

console.log(j1);
console.log(j2);

j1.atacar(j2);
j2.atacar(j1);

console.log(j1.estaVivo());
console.log(j2.estaVivo());
```

[Ver código](questao_10.ts)

#### Saída

```powershell
Jogador { forca: 10, nivel: 5, pontos_atuais: 100 }
Jogador { forca: 20, nivel: 1, pontos_atuais: 80 }
50
20
Jogador { forca: 10, nivel: 5, pontos_atuais: 80 }
Jogador { forca: 20, nivel: 1, pontos_atuais: 30 }
true
false
```