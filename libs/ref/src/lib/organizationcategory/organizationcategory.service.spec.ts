import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationcategoryService } from './organizationcategory.service';

describe('OrganizationcategoryService', () => {
  let service: OrganizationcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationcategoryService],
    }).compile();

    service = module.get<OrganizationcategoryService>(OrganizationcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
