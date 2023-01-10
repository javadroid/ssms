import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepartmentDTO } from '../../dto/department.dto';
import { Department, DepartmentDoc } from '../../schema/department.schema';


@Injectable()
export class DepartmentService {
    constructor(@InjectModel(Department.name) private DepartmentModel: Model<DepartmentDoc>) {}

    async create(createDepartment: DepartmentDTO): Promise<Department> {
      try {
        const createdDepartment = await new this.DepartmentModel(createDepartment);
        return await createdDepartment.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<Department[]> {
      try {
        return this.DepartmentModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<Department> {
      try {
        return this.DepartmentModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<Department[]> {
  
      const result = await this.DepartmentModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateDepartment: DepartmentDTO): Promise<Department> {
      try {
        return this.DepartmentModel.findByIdAndUpdate({ _id }, updateDepartment).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<Department> {
      try {
        return this.DepartmentModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
