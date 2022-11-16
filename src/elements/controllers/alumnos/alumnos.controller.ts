import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common'
import { CreateStudentDto } from 'src/elements/dtos/create-alumno.dto'
import { AlumnosService } from 'src/elements/services/alumnos/alumnos.service'

@Controller('students')
export class AlumnosController {
  constructor(private studentService: AlumnosService) {}

  @Get('/preload')
  async preloadAlumnos() {
    await this.studentService.loadStudents()
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllStudents(
    @Query('name') name: string,
    @Query('course') course: string,
  ) {
    let students = await this.studentService.findAlumnos()
    if (name) {
      students = await this.studentService.getByName({ students, name })
      return students
    }
    if (course) {
      students = await this.studentService.getByCourse({ students, course })
      return students
    } else {
      return students
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getStudentById(@Param('id', ParseIntPipe) id: number) {
    return await this.studentService.findOneAlumno(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postStudent(@Body() createStudentDto: CreateStudentDto) {
    await this.studentService.createAlumno(createStudentDto)
  }
}
