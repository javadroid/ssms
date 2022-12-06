import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatesDTO} from '../../dto/states.dto';
import { States, StatesDoc } from '../../schema/states.schema';


@Injectable()
export class StatesService {
    constructor(@InjectModel(States.name) private StatesModel: Model<StatesDoc>) {}

    async create(createStates: StatesDTO): Promise<States> {
      try {
        const createdStates = await new this.StatesModel(createStates);
        return await createdStates.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }

    async findAll(): Promise<States[]> {
      try {
        return this.StatesModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async findbyId(id: any): Promise<States> {
      try {
        return this.StatesModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async findbyAny(id: string, value: string): Promise<States[]> {

      const result = await this.StatesModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }

    async update(_id: string, updateStates: StatesDTO): Promise<States> {
      try {
        return this.StatesModel.findByIdAndUpdate({ _id }, updateStates).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async delete(_id: string): Promise<States> {
      try {
        return this.StatesModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
