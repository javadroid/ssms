import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PolicyInfoDTO } from '../../dto/policyInfo.dto';
import { PolicyInfo, PolicyInfoDoc } from '../../schema/policyInfo.schema';

@Injectable()
export class PolicyInfoService {
    constructor(@InjectModel(PolicyInfo.name) private policyInfoModel: Model<PolicyInfoDoc>) {}

  async create(createPolicyInfo: PolicyInfoDTO): Promise<PolicyInfo> {
    try {
      const createdPolicyInfo = await new this.policyInfoModel(createPolicyInfo);

      return await createdPolicyInfo.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<PolicyInfo[]> {
    try {
      return this.policyInfoModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<PolicyInfo> {
    try {
      return this.policyInfoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<PolicyInfo[]> {

    const result = await this.policyInfoModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updatePolicyInfo: PolicyInfoDTO): Promise<PolicyInfo> {
    try {
      return this.policyInfoModel.findByIdAndUpdate({ _id }, updatePolicyInfo).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<PolicyInfo> {
    try {
      return this.policyInfoModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async deleteMany(_id:string[]): Promise<any> {
    try {
      return this.policyInfoModel.deleteMany({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }}
}
