import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { AlumnosController } from './controllers/alumnos/alumnos.controller'
import { AlumnosService } from './services/alumnos/alumnos.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Student } from 'src/entities/students.entity'
import { Course } from 'src/entities/courses.entity'
import { CursosService } from './services/cursos/cursos.service'
import { CursosController } from './controllers/cursos/cursos.controller'

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Student, Course])],
  controllers: [CursosController, AlumnosController],
  providers: [CursosService, AlumnosService],
})
export class ElementsModule {}
