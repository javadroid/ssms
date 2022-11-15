import { Injectable, NotAcceptableException, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VictimInfoDTO } from '../../dto/victimInfo.dto';
import { VictimInfo,VictimInfoDoc } from '../../schema/victimInfo.schema';


@Injectable()
export class VictimInfoService {
    constructor(@InjectModel(VictimInfo.name) private victimInfoModel: Model<VictimInfoDoc>) {}

  async create(createVictimInfo: VictimInfoDTO): Promise<VictimInfo> {
    try {
      const createdVictimInfo = await new this.victimInfoModel(createVictimInfo);

      return await createdVictimInfo.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<VictimInfo[]> {
    try {
      return this.victimInfoModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<VictimInfo> {
    try {
      return this.victimInfoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<VictimInfo[]> {

    const result = await this.victimInfoModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateVictimInfo: VictimInfoDTO): Promise<VictimInfo> {
    try {
      return this.victimInfoModel.findByIdAndUpdate({ _id }, updateVictimInfo).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<VictimInfo> {
    try {
      return this.victimInfoModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
