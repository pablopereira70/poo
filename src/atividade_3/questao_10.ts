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