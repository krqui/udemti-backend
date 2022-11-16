import { Controller, Get } from '@nestjs/common'
import { CursosService } from 'src/elements/services/cursos/cursos.service'

@Controller('courses')
export class CursosController {
  constructor(private courseService: CursosService) {}

  @Get('/preload')
  async preloadCursos() {
    await this.courseService.loadCourses()
  }

  @Get()
  async getAllCourses() {
    return await this.courseService.findCourses()
  }
}
