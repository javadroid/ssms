import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrimeTypeDTO } from '../../dto/crimeType.dto';
import { CrimeType, CrimeTypeDoc } from '../../schema/crimeType.schema';

@Injectable()
export class CrimeTypeService {

    constructor(@InjectModel(CrimeType.name) private CrimeTypeModel: Model<CrimeTypeDoc>) {}

    async create(createCrimeType: CrimeTypeDTO): Promise<CrimeType> {
      try {
        const createdCrimeType = await new this.CrimeTypeModel(createCrimeType);
        return await createdCrimeType.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }

    async findAll(): Promise<CrimeType[]> {
      try {
        return this.CrimeTypeModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async findbyId(id: any): Promise<CrimeType> {
      try {
        return this.CrimeTypeModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async findbyAny(id: string, value: string): Promise<CrimeType[]> {

      const result = await this.CrimeTypeModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }

    async update(_id: string, updateCrimeType: CrimeTypeDTO): Promise<CrimeType> {
      try {
        return this.CrimeTypeModel.findByIdAndUpdate({ _id }, updateCrimeType).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async delete(_id: string): Promise<CrimeType> {
      try {
        return this.CrimeTypeModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
