import { Controller, Get } from '@nestjs/common';
import { CursosService } from 'src/elements/services/cursos/cursos.service';

@Controller('cursos')
export class CursosController {
    constructor(private cursosService:CursosService) {
        this.cursosService.loadCursos();
    }

    

    @Get()
    async getCursos(){
        const cursos = await this.cursosService.findCursos();
        return cursos;
    }
}