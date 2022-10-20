import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entities/courses.entity';
import { Repository } from 'typeorm';
import Cursos from '../../../json/cursos';

@Injectable()
export class CursosService {
    constructor(
        @InjectRepository(Course)
        private courseRepo: Repository<Course>,
    ) {}
    

// aca voy a cargar los cursos en formato json.
    async loadCursos(){
        const loadCursos=await Cursos.map(async (e)=>await this.courseRepo.save(e))
        return loadCursos;
    }
    

    findCursos(){
        return this.courseRepo.find();
    }
}