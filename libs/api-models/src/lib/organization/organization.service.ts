import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationDTO } from '../../dto/organization.dto';
import { Organization, OrganizationDoc } from '../../schema/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(@InjectModel(Organization.name) private organizationModel: Model<OrganizationDoc>) {}

  async create(createOrganization: OrganizationDTO): Promise<Organization> {
    try {
      const createdOrganization = await new this.organizationModel(createOrganization);

      return await createdOrganization.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<Organization[]> {
    try {
      return this.organizationModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<Organization> {
    try {
      return this.organizationModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<Organization[]> {

    const result = await this.organizationModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateOrganization: OrganizationDTO): Promise<Organization> {
    try {
      return this.organizationModel.findByIdAndUpdate({ _id }, updateOrganization).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<Organization> {
    try {
      return this.organizationModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }



}
