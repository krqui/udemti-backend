import { Body, Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { CreateAlumnoDto } from 'src/elements/dtos/create-alumno.dto';
import { AlumnosService } from 'src/elements/services/alumnos/alumnos.service';

@Controller('alumnos')
export class AlumnosController {
    constructor(private alumnoService:AlumnosService) {
        this.alumnoService.loadAlumnos();
    }

    @Get()
    async getAlumnos() {
        const alumnos= await this.alumnoService.findAlumnos();
        return alumnos;
    }

    @Get(':id')
    async getAlumnoId(@Param('id',ParseIntPipe) id:number){
        const alumnoPorId= await this.alumnoService.findOneAlumno(id);
        return alumnoPorId;
    }

    @Post()
    async postAlumno(@Body() createAlumnoDto: CreateAlumnoDto) {
        const elNuevo= await this.alumnoService.createAlumno(createAlumnoDto);
        // createAlumno es un metodo (funcion) de AlumnosService.
        return elNuevo;
    }
}
