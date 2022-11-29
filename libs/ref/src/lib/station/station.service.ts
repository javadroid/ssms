import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StationDTO } from '../../dto/station.dto';
import { Station, StationDoc } from '../../schema/station.schema';


@Injectable()
export class StationService {
    constructor(@InjectModel(Station.name) private StationModel: Model<StationDoc>) {}

    async create(createStation: StationDTO): Promise<Station> {
      try {
        const createdStation = await new this.StationModel(createStation);
        return await createdStation.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<Station[]> {
      try {
        return this.StationModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<Station> {
      try {
        return this.StationModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<Station[]> {
  
      const result = await this.StationModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateStates: StationDTO): Promise<Station> {
      try {
        return this.StationModel.findByIdAndUpdate({ _id }, updateStation).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<Station> {
      try {
        return this.StationModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
