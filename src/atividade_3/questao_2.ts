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