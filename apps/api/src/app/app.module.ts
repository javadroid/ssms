import { Module } from '@nestjs/common';
import {  OrganizationModule, PolicyInfoModule, ReportModule } from '@ssms/api-models';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FormsModule } from '@angular/forms';
import { RefModule } from '@ssms/ref';

@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOOSE_LINK),
    ReportModule,PolicyInfoModule,RefModule,OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
