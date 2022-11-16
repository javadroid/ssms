import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NonCrimeIncidentDto } from '../../dto/nonCrimeIncident.dto';
import { NonCrimeIncident, NonCrimeIncidentDoc } from '../../schema/nonCrimeIncident.schema';

@Injectable()
export class NonCrimeIncidentService {
 
    constructor(@InjectModel(NonCrimeIncident.name) private NonCrimeIncidentModel: Model<NonCrimeIncidentDoc>) {}

  async create(createNonCrimeIncident: NonCrimeIncidentDto): Promise<NonCrimeIncident> {
    try {
      const createdNonCrimeIncident = await new this.NonCrimeIncidentModel(createNonCrimeIncident);
      return await createdNonCrimeIncident.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<NonCrimeIncident[]> {
    try {
      return this.NonCrimeIncidentModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<NonCrimeIncident> {
    try {
      return this.NonCrimeIncidentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<NonCrimeIncident[]> {

    const result = await this.NonCrimeIncidentModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateNonCrimeIncident: NonCrimeIncidentDto): Promise<NonCrimeIncident> {
    try {
      return this.NonCrimeIncidentModel.findByIdAndUpdate({ _id }, updateNonCrimeIncident).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<NonCrimeIncident> {
    try {
      return this.NonCrimeIncidentModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
