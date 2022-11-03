import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Student } from './students.entity'

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @ManyToMany(() => Student, student => student.courses)
  @JoinTable({
    name: 'students_courses',
    joinColumn: {
      name: 'course_id',
    },
    inverseJoinColumn: {
      name: 'student_id',
    },
  })
  students: Student[]
}

// How works TypeOrm explanation for beginners xd:
// * Many to many : // La entidad que se resuelve es del tipo Student. Como segundo argumento: un student va a tener un array de courses.
// * Join table :  // La configuracion entre llaves es omitible.
// * students: Student []: // Tendre una lista en donde tenga toda la relacion hacia las categorias
