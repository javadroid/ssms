import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationDTO } from '../../dto/organization.dto';
import { Organization, OrganizationDoc } from '../../schema/organization.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class OrganizationService {
  constructor(@InjectModel(Organization.name) private organizationModel: Model<OrganizationDoc>) {}

  async create(createOrganization: OrganizationDTO): Promise<Organization> {

    const saltOrRounds = 10;
    const password = createOrganization.password ?? 'welcome';
    const hash = await bcrypt.hash(password, saltOrRounds);

    try {
      const createdOrganization = await new this.organizationModel(

        {
          ...createOrganization,
          password: hash,
          }
      );

      return await createdOrganization.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async resetpassword(password:any): Promise<Organization> {
    const saltOrRounds = 17;
    const pass =password.password;
    // console.log(_id,password)
    const hash = await bcrypt.hash(pass, saltOrRounds);
    console.log(hash)
    try {
      return this.organizationModel.findByIdAndUpdate({ _id:password.id }, {password:hash}).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }}

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
