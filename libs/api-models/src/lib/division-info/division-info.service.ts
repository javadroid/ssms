import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DivisionInfoDTO } from '../../dto/divisionInfo.dto';
import { divisionInfo, DivisionInfoDoc } from '../../schema/divisionInfo.schema';

@Injectable()
export class DivisionInfoService {
    constructor(@InjectModel(divisionInfo.name) private divisionInfoModel: Model<DivisionInfoDoc>) {}

    async create(createDivisionInfo: DivisionInfoDTO): Promise<divisionInfo> {
      try {
        const createdDivisionInfo = await new this.divisionInfoModel(createDivisionInfo);
  
        return await createdDivisionInfo.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<divisionInfo[]> {
      try {
        return this.divisionInfoModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<divisionInfo> {
      try {
        return this.divisionInfoModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<divisionInfo[]> {
  
      const result = await this.divisionInfoModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateDivisionInfo: DivisionInfoDTO): Promise<divisionInfo> {
      try {
        return this.divisionInfoModel.findByIdAndUpdate({ _id }, updateDivisionInfo).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<divisionInfo> {
      try {
        return this.divisionInfoModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
