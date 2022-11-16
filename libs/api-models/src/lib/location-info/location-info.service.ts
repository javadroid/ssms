import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationInfoDTO } from '../../dto/locationinfo.dto';
import { LocationInfo, LocationInfoDoc } from '../../schema/locationinfo.schema';

@Injectable()
export class LocationInfoService {

    constructor(@InjectModel(LocationInfo.name) private LocationInfoModel: Model<LocationInfoDoc>) {}

    async create(createLocationInfo: LocationInfoDTO): Promise<LocationInfo> {
      try {
        const createdLocationInfo = await new this.LocationInfoModel(createLocationInfo);
        return await createdLocationInfo.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<LocationInfo[]> {
      try {
        return this.LocationInfoModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<LocationInfo> {
      try {
        return this.LocationInfoModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<LocationInfo[]> {
  
      const result = await this.LocationInfoModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateLocationInfo: LocationInfoDTO): Promise<LocationInfo> {
      try {
        return this.LocationInfoModel.findByIdAndUpdate({ _id }, updateLocationInfo).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<LocationInfo> {
      try {
        return this.LocationInfoModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
