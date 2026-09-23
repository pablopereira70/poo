function arrayComTracos(array: number[]): string {
    let resultado : string = "";
    array.forEach((item, indice) => {
        if (indice == array.length - 1) {
            resultado += String(item);
        } else {
            resultado += String(item) + "-";
        }
    });
    return resultado;
}

let numeros: number[] = [10,20,30];
console.log(arrayComTracos(numeros));
