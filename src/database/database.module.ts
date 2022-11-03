import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm/dist'
import { Course } from 'src/entities/courses.entity'
import { Student } from 'src/entities/students.entity'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `${process.env.NODE_ENV}.env`
        : '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [Student, Course],
      synchronize: true,
      extra: {
        poolSize: 3,
      },
    }),
  ],
})
export class DatabaseModule {}
// Aqui trabajo con Elephantsql
