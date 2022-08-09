interface Employee{
    id: number;
    userId: number;
    nume: string;
    prenume: string;
    email:string;
    varsta: string;
    functie: string;
    idSuperior: number;
    idMagazin: number;
    scorPerformanta: number;
    idArhiva: number;
    imageUrl: string;
    dataAngajare:Date;
}

export {Employee}