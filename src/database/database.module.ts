import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { Course } from "src/entities/courses.entity";
import { Student } from "src/entities/students.entity";
@Module({
    imports:[
        TypeOrmModule.forRoot({
            type:"postgres",
            host:"localhost",
            port:5432,
            username:'postgres',
            password:'postgres',
            database:'postgres',
            entities: [Student, Course],
            synchronize:true
        })
    ]
})

export class DatabaseModule {}