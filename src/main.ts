import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
const axios = require('axios')
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://localhost:3000',
  })
  await app.listen(3333)

  async function makeRequest() {
    const config = {
      method: 'get',
      url: 'http://localhost:3333/courses/preload',
    }
    await axios(config)
  }

  async function makeRequest2() {
    const config2 = {
      method: 'get',
      url: 'http://localhost:3333/students/preload',
    }
    await axios(config2)
  }

  makeRequest()

  setTimeout(() => {
    makeRequest2()
  }, 3000)
}
bootstrap()
// Si no usaba setTimeOut no cargaban todos los cursos antes de cargar a los students.
