import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonnelDTO } from '../../dto/personnel.dto';
import { Personnel, PersonnelDoc } from '../../schema/personnel.schema';

@Injectable()
export class PersonnelService {

  constructor(@InjectModel(Personnel.name) private personnelModel: Model<PersonnelDoc>) {}

  async create(createPersonnel: PersonnelDTO): Promise<Personnel> {
    try {
      const createdPersonnel = await new this.personnelModel(createPersonnel);

      return await createdPersonnel.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<Personnel[]> {
    try {
      return this.personnelModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<Personnel> {
    try {
      return this.personnelModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<Personnel[]> {

    const result = await this.personnelModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updatePersonnel: PersonnelDTO): Promise<Personnel> {
    try {
      return this.personnelModel.findByIdAndUpdate({ _id }, updatePersonnel).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<Personnel> {
    try {
      return this.personnelModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


}
