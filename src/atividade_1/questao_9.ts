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