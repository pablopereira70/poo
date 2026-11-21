"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Circulo {
    constructor() {
        this.raio = 0;
        this.pi = 3.14;
    }
    calcularArea() {
        return this.pi * this.raio ** 2;
    }
    calcularPerimetro() {
        return 2 * this.pi * this.raio;
    }
}
let circulo = new Circulo();
circulo.raio = 6;
console.log(circulo.calcularArea());
console.log(circulo.calcularPerimetro());
//# sourceMappingURL=questao_9.js.map