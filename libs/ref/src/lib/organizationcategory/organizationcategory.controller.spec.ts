import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationcategoryController } from './organizationcategory.controller';

describe('OrganizationcategoryController', () => {
  let controller: OrganizationcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationcategoryController],
    }).compile();

    controller = module.get<OrganizationcategoryController>(OrganizationcategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
