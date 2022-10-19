import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./students.entity";

@Entity({name:'courses'})
export class Course {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    // ↓ la entidad que se resuelve es del tipo Student
    // como segundo argumento: un student va a tener un array de courses.
    @ManyToMany(()=> Student, (student)=>student.courses)
    // ↓ La configuracion entre llaves es omitible
    @JoinTable({
        name:'students_courses',
        joinColumn: {
            name: 'course_id',
        },
        inverseJoinColumn: {
            name: 'student_id'
        }
    })

    students: Student[];
     // ↑ tendre una lista en donde tenga toda la relacion hacia las categorias
}