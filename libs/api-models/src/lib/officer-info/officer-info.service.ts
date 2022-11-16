import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OfficerInfoDTO } from '../../dto/officerInfo.dto';
import { officeInfo, officerInfoDoc } from '../../schema/officerInfo.schema';


@Injectable()
export class OfficerInfoService {
    constructor(@InjectModel(officeInfo.name) private officerInfoModel: Model<officerInfoDoc>) {}

  async create(createOfficerInfo: OfficerInfoDTO): Promise<officeInfo> {
    try {
      const createdofficeInfo = await new this.officerInfoModel(createOfficerInfo);

      return await createdofficeInfo.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<officeInfo[]> {
    try {
      return this.officerInfoModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<officeInfo> {
    try {
      return this.officerInfoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<officeInfo[]> {

    const result = await this.officerInfoModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateOfficeInfo: OfficerInfoDTO): Promise<officeInfo> {
    try {
      return this.officerInfoModel.findByIdAndUpdate({ _id }, updateOfficeInfo).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<officeInfo> {
    try {
      return this.officerInfoModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

}
