import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationcategoryDTO } from '../../dto/organizationcategory.dto';
import { Organizationcategory, OrganizationcategoryDoc } from '../../schema/organizationcategory.schema';


@Injectable()
export class OrganizationcategoryService {
    constructor(@InjectModel(Organizationcategory.name) private OrganizationcategoryModel: Model<OrganizationcategoryDoc>) {}

    async create(createOrganizationcategory: OrganizationcategoryDTO): Promise<Organizationcategory> {
      try {
        const createdOrganizationcategory = await new this.OrganizationcategoryModel(createOrganizationcategory);
        return await createdOrganizationcategory.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<Organizationcategory[]> {
      try {
        return this.OrganizationcategoryModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<Organizationcategory> {
      try {
        return this.OrganizationcategoryModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<Organizationcategory[]> {
  
      const result = await this.OrganizationcategoryModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateOrganizationcategory: OrganizationcategoryDTO): Promise<Organizationcategory> {
      try {
        return this.OrganizationcategoryModel.findByIdAndUpdate({ _id }, updateOrganizationcategory).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<Organizationcategory> {
      try {
        return this.OrganizationcategoryModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
