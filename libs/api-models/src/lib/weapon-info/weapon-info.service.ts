import { Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeaponInfoDTO } from '../../dto/weaponInfo.dto';
import { WeaponInfo, WeaponInfoDoc } from '../../schema/weaponInfo.schema';

@Injectable()
export class WeaponInfoService {
    constructor(@InjectModel(WeaponInfo.name) private weaponInfoModel: Model<WeaponInfoDoc>) {}

  async create(createWeaponInfo: WeaponInfoDTO): Promise<WeaponInfo> {
    try {
      const createdWeaponInfo = await new this.weaponInfoModel(createWeaponInfo);

      return await createdWeaponInfo.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<WeaponInfo[]> {
    try {
      return this.weaponInfoModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<WeaponInfo> {
    try {
      return this.weaponInfoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<WeaponInfo[]> {

    const result = await this.weaponInfoModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateWeaponInfo: WeaponInfoDTO): Promise<WeaponInfo> {
    try {
      return this.weaponInfoModel.findByIdAndUpdate({ _id }, updateWeaponInfo).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<WeaponInfo> {
    try {
      return this.weaponInfoModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
