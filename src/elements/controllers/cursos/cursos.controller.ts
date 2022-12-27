import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { CreateCourseDto } from 'src/elements/dtos/create-course.dto'
import { CursosService } from 'src/elements/services/cursos/cursos.service'

@Controller('courses')
export class CursosController {
  constructor(private courseService: CursosService) {}

  @Get('/preload')
  async preloadCursos() {
    await this.courseService.loadCourses()
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllCourses() {
    return await this.courseService.findCourses()
  }

  @Post('/createCourse')
  @HttpCode(HttpStatus.CREATED)
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    await this.courseService.createCourse(createCourseDto)
  }
}
