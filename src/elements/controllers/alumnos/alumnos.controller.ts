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
  Patch,
  Put,
  Delete,
} from '@nestjs/common'
import { CreateStudentDto } from 'src/elements/dtos/create-alumno.dto'
import { UpdateStudentDto } from 'src/elements/dtos/update-student.dto'
import { AlumnosService } from 'src/elements/services/alumnos/alumnos.service'
import {
  getByCourse,
  getByDni,
  getByName,
  getByNationality,
  getByStatus,
  getBySurname,
  sortNames,
} from 'src/utils/utils'

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
    @Query('status') status: string,
    @Query('nationality') nationality: string,
    @Query('dni') dni: string,
    @Query('sortName') sortName: string,
  ) {
    let students = await this.studentService.findAlumnos()

    if (name) {
      let studentsName = []
      let studentsSurname = []
      studentsName = await getByName({ students, name })
      studentsSurname = await getBySurname({ students, name })
      students = await studentsName.concat(studentsSurname)
    }
    if (course) {
      students = await getByCourse({ students, course })
    }
    if (status) {
      students = await getByStatus({ students, status })
    }
    if (nationality) {
      students = await getByNationality({ students, nationality })
    }
    if (dni) {
      students = await getByDni({ students, dni })
    }
    if (sortName) {
      students = await sortNames({ students, sortName })
    }
    return students
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

  @Patch('/update/:id')
  @HttpCode(HttpStatus.CREATED)
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: CreateStudentDto,
  ) {
    await this.studentService.updateStudent(id, updateStudentDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteStudentById(@Param('id', ParseIntPipe) id: number) {
    await this.studentService.deleteStudent(id)
  }
}
