"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Retangulo {
    constructor() {
        this.base = 0;
        this.altura = 0;
    }
    calcularArea() {
        return this.base * this.altura;
    }
    calcularPerimetro() {
        return 2 * this.base + 2 * this.altura;
    }
}
let retangulo = new Retangulo();
retangulo.base = 5;
retangulo.altura = 3;
console.log(retangulo.calcularArea());
console.log(retangulo.calcularPerimetro());
//# sourceMappingURL=questao_8.js.map