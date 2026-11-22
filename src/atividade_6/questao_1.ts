class Veiculo{
    placa : string;
    ano : number;
}

class Carro extends Veiculo{
    modelo : string;
}

class CarroEletrico extends Carro{
    autonomiaBateria : number;
}

let ford : Carro = new Carro;
ford.ano = 2026;
ford.modelo = "Ford Territory";
ford.placa = "5ABC23";
console.log(ford);
let byd : CarroEletrico = new CarroEletrico;
byd.ano = 2026;
byd.modelo = "Byd Dolphin";
byd.placa = "64FDC3";
byd.autonomiaBateria = 50;
console.log(byd);