import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CaseFileInfoDTO } from '../../dto/casefileinfo.dto';
import { CaseFileInfo, CaseFileInfoDoc } from '../../schema/casefileinfo.schema';


@Injectable()
export class CaseFileInfoService {

    constructor(@InjectModel(CaseFileInfo.name) private CaseFileInfoModel: Model<CaseFileInfoDoc>) {}

    async create(createCaseFileInfo: CaseFileInfoDTO): Promise<CaseFileInfo> {
      try {
        const createdCaseFileInfo = await new this.CaseFileInfoModel(createCaseFileInfo);
        return await createdCaseFileInfo.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<CaseFileInfo[]> {
      try {
        return this.CaseFileInfoModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<CaseFileInfo> {
      try {
        return this.CaseFileInfoModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<CaseFileInfo[]> {
  
      const result = await this.CaseFileInfoModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateCaseFileInfo: CaseFileInfoDTO): Promise<CaseFileInfo> {
      try {
        return this.CaseFileInfoModel.findByIdAndUpdate({ _id }, updateCaseFileInfo).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<CaseFileInfo> {
      try {
        return this.CaseFileInfoModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
