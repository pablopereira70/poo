function exibir(...letras: string[]) {
    letras.forEach((letra, indice) => {
        if(indice < letras.length) {
            console.log(letra);
        }
    });
}

exibir("a", "b");
exibir("a", "b", "c");
exibir("a","b","c","d");