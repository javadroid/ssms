import { Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeaponDTO } from '../../dto/weapon.dto';
import { Weapon, WeaponDoc } from '../../schema/weapon.schema';

@Injectable()
export class WeaponService {
    constructor(@InjectModel(Weapon.name) private weaponModel: Model<WeaponDoc>) {}

  async create(createWeapon: WeaponDTO): Promise<Weapon> {
    try {
      const createdWeapon = await new this.weaponModel(createWeapon);

      return await createdWeapon.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<Weapon[]> {
    try {
      return this.weaponModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<Weapon> {
    try {
      return this.weaponModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<Weapon[]> {

    const result = await this.weaponModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateWeapon: WeaponDTO): Promise<Weapon> {
    try {
      return this.weaponModel.findByIdAndUpdate({ _id }, updateWeapon).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<Weapon> {
    try {
      return this.weaponModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
