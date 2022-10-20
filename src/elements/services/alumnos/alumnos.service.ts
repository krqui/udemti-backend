import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../../../entities/students.entity';
import { Repository, In } from 'typeorm';
import { CreateAlumnoParams } from 'src/utils/types';
import { Course } from 'src/entities/courses.entity';
import Alumnos from '../../../json/alumnos';
// you don't want to call a database directly from the controller. 
// That's what the service class is for okay.
// Repository definition → https://desarrolloweb.com/articulos/repositorios-typeorm-nest#:~:text=Los%20repositorios%20son%20una%20de,de%20escritura%20en%20las%20tablas.

@Injectable()
export class AlumnosService {
    constructor(
        @InjectRepository(Student) 
        private studentRepository: Repository<Student>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
    ) {}

    // aca voy a cargar a los alumnos en formato json.
    async loadAlumnos(){
        const loadAlumnos=await Alumnos.map(async (e)=>

        {const nuevoAlumno= await this.studentRepository.create({
            ...e,
            createdAt:new Date(),
        });
        // console.log(e);

        // Lo que comente en el pull request. ↓↓
        /*const cursosIds= await e.coursesIds;
         console.log(cursosIds);

        const cursos = await this.courseRepository.findBy({id:In(cursosIds)});
        console.log(cursos);
        nuevoAlumno.courses= cursos;*/
        // ↑ TODOS los alumnos precargados DEBERIAN vincularse a la tabla de cursos correctamente.
        // Mi teoria tras dar console.logs es que los logs de Nest se ejecutan antes de que todo este ".service" se ejecute. Creo que debo convertirlo en asincronico.
        return await this.studentRepository.save(nuevoAlumno)}
        )
        return loadAlumnos;
    }


    findAlumnos(){
        return this.studentRepository.find({
            relations:['courses']
        });
    }
    
    async findOneAlumno(id:number){
        
        return await this.studentRepository.find({
            where:{id:id},
            //select:{surname:true}, 
            relations: ['courses']
        })
    }

    async createAlumno(alumnoDetails:CreateAlumnoParams){
        const newAlumno=  this.studentRepository.create({
            ...alumnoDetails,
            createdAt:new Date(),
        });
        const coursesIds = alumnoDetails.coursesIds;
        const courses = await this.courseRepository.findBy({ id: In(coursesIds) })
        console.log(courses);
        newAlumno.courses=courses;

        return this.studentRepository.save(newAlumno);
    }
}
