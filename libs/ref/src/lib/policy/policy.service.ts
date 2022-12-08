import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PolicyDTO } from '../../dto/policy.dto';
import { Policy, PolicyDoc } from '../../schema/policy.schema';

@Injectable()
export class PolicyService {
    constructor(@InjectModel(Policy.name) private PolicyModel: Model<PolicyDoc>) {}

    async create(createPolicy: PolicyDTO): Promise<Policy> {
      try {
        const createdPolicy = await new this.PolicyModel(createPolicy);
        return await createdPolicy.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }

    async findAll(): Promise<Policy[]> {
      try {
        return this.PolicyModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async findbyId(id: any): Promise<Policy> {
      try {
        return this.PolicyModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async findbyAny(id: string, value: string): Promise<Policy[]> {

      const result = await this.PolicyModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }

    async update(_id: string, updatePolicy: PolicyDTO): Promise<Policy> {
      try {
        return this.PolicyModel.findByIdAndUpdate({ _id }, updatePolicy).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async delete(_id: string): Promise<Policy> {
      try {
        return this.PolicyModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
