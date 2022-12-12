import { Module } from '@nestjs/common';

import {
  CriminalInfoModule,
  FileuploadModule,
  OrganizationModule,
  PersonnelModule,
  PolicyInfoModule,
  ReportModule,
  SendMailModule,
  VictimInfoModule,
} from '@ssms/api-models';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FormsModule } from '@angular/forms';
import { RefModule } from '@ssms/ref';



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOOSE_LINK),

    ReportModule,
    PolicyInfoModule,
    RefModule,
    OrganizationModule,
    PersonnelModule,

    ReportModule,
    PolicyInfoModule,
    RefModule,
    OrganizationModule,
    PersonnelModule,
    CriminalInfoModule,
    FileuploadModule,
    SendMailModule,
    VictimInfoModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
