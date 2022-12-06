import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { States, StatesSchema } from '../../schema/states.schema';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';


@Module({
  imports:[MongooseModule.forFeature([{ name: States.name, schema: StatesSchema }])],
  controllers: [StatesController],
  providers: [StatesService]
})
export class StatesModule {}
