import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchDTO } from '../../dto/branch.dto';
import { Branch, BranchDoc } from '../../schema/branch.schema';


@Injectable()
export class BranchService {
    constructor(@InjectModel(Branch.name) private BranchModel: Model<BranchDoc>) {}

    async create(createBranch: BranchDTO): Promise<Branch> {
      try {
        const createdBranch = await new this.BranchModel(createBranch);
        return await createdBranch.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<Branch[]> {
      try {
        return this.BranchModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<Branch> {
      try {
        return this.BranchModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<Branch[]> {
  
      const result = await this.BranchModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateBranch: BranchDTO): Promise<Branch> {
      try {
        return this.BranchModel.findByIdAndUpdate({ _id }, updateBranch).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<Branch> {
      try {
        return this.BranchModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
