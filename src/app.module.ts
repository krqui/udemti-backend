import { Module } from '@nestjs/common'
import { ElementsModule } from './elements/elements.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `${process.env.NODE_ENV}.env`
        : '.development.env',
    }),
    ElementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
