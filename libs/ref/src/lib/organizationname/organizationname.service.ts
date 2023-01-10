import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationnameDTO } from '../../dto/organizationname.dto';
import { Organizationname, OrganizationnameDoc } from '../../schema/organizationname.schema';


@Injectable()
export class OrganizationnameService {
    constructor(@InjectModel(Organizationname.name) private OrganizationnameModel: Model<OrganizationnameDoc>) {}

    async create(createOrganizationname: OrganizationnameDTO): Promise<Organizationname> {
      try {
        const createdOrganizationname = await new this.OrganizationnameModel(createOrganizationname);
        return await createdOrganizationname.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<Organizationname[]> {
      try {
        return this.OrganizationnameModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<Organizationname> {
      try {
        return this.OrganizationnameModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<Organizationname[]> {
  
      const result = await this.OrganizationnameModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateOrganizationname: OrganizationnameDTO): Promise<Organizationname> {
      try {
        return this.OrganizationnameModel.findByIdAndUpdate({ _id }, updateOrganizationname).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<Organizationname> {
      try {
        return this.OrganizationnameModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
