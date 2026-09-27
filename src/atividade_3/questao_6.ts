class Triangulo {
    a: number;
    b: number;
    c: number;

    constructor(a:number, b:number, c:number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    ehTriangulo(): boolean {
        return this.b + this.c > this.a &&
               this.a + this.c > this.b &&
               this.a + this.b > this.c;
    }

    ehEquilatero(): boolean {
        return this.ehTriangulo() &&
               this.a == this.b &&
               this.b == this.c;
    }

    ehEscaleno(): boolean {
        return this.ehTriangulo() &&
               this.a != this.b &&
               this.b != this.c &&
               this.a != this.c;
    }

    ehIsoceles(): boolean {
        return this.ehTriangulo() &&
               !this.ehEscaleno() &&
               !this.ehEquilatero();
    }
}

let t1 = new Triangulo(10,3,4);
console.log(t1.ehTriangulo());
console.log(t1.ehEquilatero());
console.log(t1.ehEscaleno());
console.log(t1.ehIsoceles());

let t2 = new Triangulo(5, 5, 5);
console.log(t2.ehTriangulo());    
console.log(t2.ehEquilatero());   
console.log(t2.ehEscaleno());     
console.log(t2.ehIsoceles()); 

let t3 = new Triangulo(3, 4, 5);
console.log(t3.ehTriangulo());    
console.log(t3.ehEquilatero());   
console.log(t3.ehEscaleno());     
console.log(t3.ehIsoceles());

let t4 = new Triangulo(5, 5, 8);
console.log(t4.ehTriangulo());    
console.log(t4.ehEquilatero());   
console.log(t4.ehEscaleno());     
console.log(t4.ehIsoceles());     