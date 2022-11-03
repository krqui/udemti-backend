import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from 'src/entities/courses.entity'
import { Repository } from 'typeorm'
import Cursos from '../../../json/cursos'

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
  ) {}

  async loadCourses() {
    Cursos.map(async e => {
      await this.courseRepo.save(e)
    })
  }

  async findCourses() {
    return await this.courseRepo.find()
  }
}
