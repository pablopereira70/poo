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