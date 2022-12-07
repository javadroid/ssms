import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationnameService } from './organizationname.service';

describe('OrganizationnameService', () => {
  let service: OrganizationnameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationnameService],
    }).compile();

    service = module.get<OrganizationnameService>(OrganizationnameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
