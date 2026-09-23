function saudacao(nome: string, pronome: string = "Sr"): string{
    return `${pronome}. ${nome}`;
}

console.log(saudacao("Ely"));
console.log(saudacao("Aline", "Sra"));