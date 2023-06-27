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
    console.log('POST alumno: ', newStudent)

    await this.studentRepository.save(newStudent)
  }

  async updateStudent(id: number, studentUpdates: CreateAlumnoParams) {
    const updatedStudent = this.studentRepository.create({
      ...studentUpdates,
      id: id,
      updatedAt: new Date(),
    })
    updatedStudent.courses = await this.courseRepository.findBy({
      id: In(studentUpdates.coursesIds),
    })

    const updated = [updatedStudent]
    const student = await this.findOneAlumno(id)

    const studentNow = Object.assign(student, updated)
    await this.studentRepository.save(studentNow)
  }

  async deleteStudent(id: number) {
    const exstudent = await this.findOneAlumno(id)
    await this.studentRepository.remove(exstudent)
  }
}
