import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LgaDTO } from '../../dto/lga.dto';
import { Lga, LgaDoc } from '../../schema/lga.schema';


@Injectable()
export class LgaService {
    constructor(@InjectModel(Lga.name) private LgaModel: Model<LgaDoc>) {}

    async create(createLga: LgaDTO): Promise<Lga> {
      try {
        const createdLga = await new this.LgaModel(createLga);
        return await createdLga.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }
  
    async findAll(): Promise<Lga[]> {
      try {
        return this.LgaModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyId(id: any): Promise<Lga> {
      try {
        return this.LgaModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findbyAny(id: string, value: string): Promise<Lga[]> {
  
      const result = await this.LgaModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }
  
    async update(_id: string, updateLga: LgaDTO): Promise<Lga> {
      try {
        return this.LgaModel.findByIdAndUpdate({ _id }, updateLga).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async delete(_id: string): Promise<Lga> {
      try {
        return this.LgaModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
