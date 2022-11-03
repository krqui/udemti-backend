import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Student } from '../../../entities/students.entity'
import { Repository, In } from 'typeorm'
import { CreateAlumnoParams } from 'src/utils/types'
import { Course } from 'src/entities/courses.entity'
import Alumnos from '../../../json/alumnos'

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async loadStudents() {
    Alumnos.map(async e => {
      const oldStudent = await this.studentRepository.create({
        ...e,
        createdAt: new Date(),
      })

      oldStudent.courses = await this.courseRepository.findBy({
        id: In(e.coursesIds),
      })

      await this.studentRepository.save(oldStudent)
    })
  }

  async findAlumnos() {
    return await this.studentRepository.find({
      relations: ['courses'],
    })
  }

  async getByName({ students, name }) {
    return students.filter(students =>
      students.name.toLowerCase().includes(name.toLowerCase()),
    )
  }

  // Lo que aqui consegui programar es que aquellos alumnos (element) que posean un determinado curso, sean pusheados a un array titulado arru.
  // En caso de que el "element" NO posea el curso buscado, entonces se le asigna el valor de un array vacio. Mientras que de encontrarse el valor, entonces el alumno (element) si posee el curso solicitado.
  async getByCourse({ students, course }) {
    let arr = []
    await students.map(element => {
      let propertyFounded = element.courses.filter(e =>
        e.title.includes(course),
      )

      if (propertyFounded.length > 0) {
        arr.push(element)
      }
    })
    return arr
  }

  async findOneAlumno(id: number) {
    return await this.studentRepository.find({
      where: { id: id },
      relations: ['courses'],
    })
  }

  async createAlumno(studentDetails: CreateAlumnoParams) {
    const newStudent = this.studentRepository.create({
      ...studentDetails,
      createdAt: new Date(),
    })

    newStudent.courses = await this.courseRepository.findBy({
      id: In(studentDetails.coursesIds),
    })

    await this.studentRepository.save(newStudent)
  }
}
