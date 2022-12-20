import { Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrimeInfoDTO } from '../../dto/crimeInfo.dto';
import { CrimeInfo, CrimeInfoDoc } from '../../schema/crimeInfo.schema';

@Injectable()
export class CrimeInfoService {
    constructor(@InjectModel(CrimeInfo.name) private crimeInfoModel: Model<CrimeInfoDoc>) {}

  async create(createCrimeInfo: CrimeInfoDTO): Promise<CrimeInfo> {
    try {
      const createdCrimeInfo = await new this.crimeInfoModel(createCrimeInfo);

      return await createdCrimeInfo.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<CrimeInfo[]> {
    try {
      return this.crimeInfoModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<CrimeInfo> {
    try {
      return this.crimeInfoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<CrimeInfo[]> {

    const result = await this.crimeInfoModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateCrimeInfo: CrimeInfoDTO): Promise<CrimeInfo> {
    try {
      return this.crimeInfoModel.findByIdAndUpdate({ _id }, updateCrimeInfo).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<CrimeInfo> {
    try {
      return this.crimeInfoModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async search(args: string): Promise<CrimeInfo> {

    try {
      return this.crimeInfoModel
      .findOne({
        $or: [
          { crimeId: { $regex: args, $options: 'i' } },
        ],
      })
      .exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


}

