import { StatusAlumno } from "src/models/data.model";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Course } from "./courses.entity";

@Entity({name:'students'})
export class Student {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    surname:string;

    @Column({
        type:'enum',
        enum: StatusAlumno,
        default: StatusAlumno.NoMatriculado
    })
    status:string

    @Column({type:'date'})
    birthdate:string

    @Column({default:new Date()})
    createdAt: Date;

    @Column({nullable:true})
    idioma_Materno:string

    @Column({unique:true})
    DNI:number

    // como segundo argumento: un curso va a tener distintos estudiantes.
    @ManyToMany(()=>Course, (course)=>course.students)
    courses: Course[];
}
// relacion bidimensional: si yo estoy dentro de los alumnos puedo obtener todos los cursos y
// si estoy dentro del curso puede obtener a todos los alumnos.
// por eso aqui tambien importo many to many