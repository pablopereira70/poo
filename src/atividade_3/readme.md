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
Hotel { quantReservas: 2 }
Hotel {}
Hotel { quantReservas: NaN }
undefined
```

O TS inicia a variável como `undefined` caso a flag `strictPropertyInitialization`esteja desabilitada, pois essa flag exige que todas as propriedades de classe sejam inicializadas, e se houver classes em desacordo será gerado uma exceção.

### Questão 3