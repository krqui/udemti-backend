import { Module } from '@nestjs/common';
import { ElementsModule} from './elements/elements.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [ ElementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
