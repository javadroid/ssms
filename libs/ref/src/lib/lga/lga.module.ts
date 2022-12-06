import { Module } from '@nestjs/common';
import { LgaController } from './lga.controller';
import { LgaService } from './lga.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lga, LgaSchema } from '../../schema/lga.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Lga.name, schema: LgaSchema }])],
  controllers: [LgaController],
  providers: [LgaService]
})
export class LgaModule {}
