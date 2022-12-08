import { Module } from '@nestjs/common';
import { StatesModule } from './states/states.module';
import { LgaModule } from './lga/lga.module';
import { OrganizationcategoryController } from './organizationcategory/organizationcategory.controller';
import { OrganizationcategoryService } from './organizationcategory/organizationcategory.service';
import { OrganizationcategoryModule } from './organizationcategory/organizationcategory.module';
import { OrganizationnameModule } from './organizationname/organizationname.module';
import { BranchModule } from './branch/branch.module';
import { DepartmentService } from './department/department.service';
import { DepartmentController } from './department/department.controller';
import { DepartmentModule } from './department/department.module';
import { StationModule } from './station/station.module';
import { OrganizationnameController } from './organizationname/organizationname.controller';
import { BranchController } from './branch/branch.controller';
import { StationController } from './station/station.controller';
import { LgaController } from './lga/lga.controller';
import { StatesController } from './states/states.controller';
import { OrganizationnameService } from './organizationname/organizationname.service';
import { BranchService } from './branch/branch.service';
import { StationService } from './station/station.service';
import { LgaService } from './lga/lga.service';
import { StatesService } from './states/states.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organizationcategory,
  OrganizationcategorySchema,
} from '../schema/organizationcategory.schema';
import { Station, StationSchema } from '../schema/station.schema';
import { Department, DepartmentSchema } from '../schema/department.schema';
import { Organizationname, OrganizationnameSchema } from '../schema/organizationname.schema';
import { Branch, BranchSchema } from '../schema/branch.schema';
import { Lga, LgaSchema } from '../schema/lga.schema';
import { States, StatesSchema } from '../schema/states.schema';
import { PolicyController } from './policy/policy.controller';
import { PolicyModule } from './policy/policy.module';
import { PolicyService } from './policy/policy.service';
import { Policy, PolicySchema } from '../schema/policy.schema';
import { WeaponController } from './weapon/weapon.controller';
import { WeaponModule } from './weapon/weapon.module';
import { DivisionController } from './division/division.controller';
import { DivisionModule } from './division/division.module';

@Module({
  controllers: [
    OrganizationcategoryController,
    DepartmentController,
    OrganizationnameController,
    BranchController,
    StationController,
    LgaController,
    StatesController,
    PolicyController,
    WeaponController,
    DivisionController,
  ],
  providers: [
    OrganizationcategoryService,
    DepartmentService,
    OrganizationnameService,
    BranchService,
    StationService,
    LgaService,
    StatesService,
    PolicyService,
  ],
  exports: [],
  imports: [
    MongooseModule.forFeature([
      { name: Organizationcategory.name, schema: OrganizationcategorySchema },
    ]),MongooseModule.forFeature([{ name: Station.name, schema: StationSchema }]),
    MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }]),
    MongooseModule.forFeature([{ name: Organizationname.name, schema: OrganizationnameSchema }]),
    MongooseModule.forFeature([{ name: States.name, schema: StatesSchema }]),
    MongooseModule.forFeature([{ name: Lga.name, schema: LgaSchema }]),
    MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }]),
    MongooseModule.forFeature([{ name: Policy.name, schema: PolicySchema }]),
    StatesModule,
    LgaModule,
    OrganizationcategoryModule,
    OrganizationnameModule,
    BranchModule,
    DepartmentModule,
    StationModule,
    PolicyModule,
    WeaponModule,
    DivisionModule,
  ],
})
export class RefModule {}
