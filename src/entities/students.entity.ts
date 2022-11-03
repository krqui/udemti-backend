//import { StatusAlumno } from 'src/models/data.model'
import { StatusAlumno } from '../models/data.model'
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Course } from './courses.entity'

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  surname: string

  @Column({
    type: 'enum',
    enum: StatusAlumno,
    default: StatusAlumno.NotEnrolled,
  })
  status: string

  @Column({ type: 'date' })
  birthdate: string

  @Column({ default: new Date() })
  createdAt: Date

  @Column({ nullable: true })
  nationality: string

  @Column({ unique: true })
  DNI: number

  // como segundo argumento: un curso va a tener distintos estudiantes.
  @ManyToMany(() => Course, course => course.students)
  courses: Course[]
}
// relacion bidimensional: si yo estoy dentro de los alumnos puedo obtener todos los cursos y
// si estoy dentro del curso puede obtener a todos los alumnos, por eso aqui tambien importo many to many

// dato anécdota: En StatusAlumno no se por qué la compu se me habia quedado con default Status.AlumnoNomatriculado, incluso a pesar de haber cambiado los enums y hasta haber reiniciado el servicio de postgres.
// ↑ Pero se arregló mágicamente xd.
