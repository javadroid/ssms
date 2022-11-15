import { Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriminalInfoDTO } from '../../dto/criminalInfo.dto';
import { CriminalInfo, CriminalInfoDoc } from '../../schema/criminalInfo.schema';

@Injectable()
export class CriminalInfoService {
    constructor(@InjectModel(CriminalInfo.name) private criminalInfoModel: Model<CriminalInfoDoc>) {}

  async create(createCriminalInfo: CriminalInfoDTO): Promise<CriminalInfo> {
    try {
      const createdCriminalInfo = await new this.criminalInfoModel(createCriminalInfo);

      return await createdCriminalInfo.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<CriminalInfo[]> {
    try {
      return this.criminalInfoModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<CriminalInfo> {
    try {
      return this.criminalInfoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<CriminalInfo[]> {

    const result = await this.criminalInfoModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateCriminalInfo: CriminalInfoDTO): Promise<CriminalInfo> {
    try {
      return this.criminalInfoModel.findByIdAndUpdate({ _id }, updateCriminalInfo).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<CriminalInfo> {
    try {
      return this.criminalInfoModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
