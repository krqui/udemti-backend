export type CreateAlumnoParams= {
    name:string;
    surname:string;
    //status:string|null;
    birthdate:string;
    idioma_Materno:string;
    DNI:number,
    coursesIds: number[]
}