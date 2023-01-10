import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RankDTO } from '../../dto/rank.dto';
import { Rank, RankDoc } from '../../schema/rank.schema';

@Injectable()
export class RankService {
    constructor(@InjectModel(Rank.name) private RankModel: Model<RankDoc>) {}

    async create(createRank: RankDTO): Promise<Rank> {
      try {
        const createdRank = await new this.RankModel(createRank);
        return await createdRank.save();
      } catch (error) {
        throw new NotAcceptableException(error.message);
      }
    }

    async findAll(): Promise<Rank[]> {
      try {
        return this.RankModel.find().exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async findbyId(id: any): Promise<Rank> {
      try {
        return this.RankModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async findbyAny(id: string, value: string): Promise<Rank[]> {

      const result = await this.RankModel.find({ [id]: value }).exec();
      if (!result) {
        throw new NotFoundException(value+' not found in fleid ' +id);
      }
      return result;
    }

    async update(_id: string, updateRank: RankDTO): Promise<Rank> {
      try {
        return this.RankModel.findByIdAndUpdate({ _id }, updateRank).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    async delete(_id: string): Promise<Rank> {
      try {
        return this.RankModel.findByIdAndDelete({ _id }).exec();
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
