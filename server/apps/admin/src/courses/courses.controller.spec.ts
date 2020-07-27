import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';

describe('Courses Controller', () => {
  let controller: CourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
    }).compile();

    controller = module.get<CourseController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
