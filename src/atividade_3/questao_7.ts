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
        return this.ligado;
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