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