import { Test, TestingModule } from '@nestjs/testing';
import { AlumnosController } from './alumnos.controller';

describe('AlumnosController', () => {
  let controller: AlumnosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlumnosController],
    }).compile();

    controller = module.get<AlumnosController>(AlumnosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
