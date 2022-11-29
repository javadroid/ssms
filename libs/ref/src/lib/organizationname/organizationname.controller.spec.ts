import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationnameController } from './organizationname.controller';

describe('OrganizationnameController', () => {
  let controller: OrganizationnameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationnameController],
    }).compile();

    controller = module.get<OrganizationnameController>(OrganizationnameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
