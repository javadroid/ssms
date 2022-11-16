import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SecurityApparatusDTO } from '../../dto/securityapparatus.dto';
import { SecurityApparatus, SecurityApparatusDoc } from '../../schema/securityapparatus.schema';

@Injectable()
export class SecurityApparatusService {
    constructor(@InjectModel(SecurityApparatus.name) private SecurityApparatusModel: Model<SecurityApparatusDoc>) {}

    async create(createSecurityApparatus: SecurityApparatusDTO): Promise<SecurityApparatus> {
      try {
        const createdSecurityApparatus = await new this.SecurityApparatusModel(createSecurityApparatus);
        return await createdSecurityApparatus.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<SecurityApparatus[]> {
      try {
        return this.SecurityApparatusModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<SecurityApparatus> {
      try {
        return this.SecurityApparatusModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<SecurityApparatus[]> {
  
      const result = await this.SecurityApparatusModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateSecurityApparatus: SecurityApparatusDTO): Promise<SecurityApparatus> {
      try {
        return this.SecurityApparatusModel.findByIdAndUpdate({ _id }, updateSecurityApparatus).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<SecurityApparatus> {
      try {
        return this.SecurityApparatusModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
