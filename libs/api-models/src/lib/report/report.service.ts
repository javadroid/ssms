import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportDTO } from '../../dto/report.dto';
import { Report, ReportDoc } from '../../schema/report.schema';

@Injectable()
export class ReportService {
    constructor(@InjectModel(Report.name) private reportModel: Model<ReportDoc>) {}

  async create(createReport: ReportDTO): Promise<Report> {
    try {
      const createdReport = await new this.reportModel(createReport);

      return await createdReport.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<Report[]> {
    try {
      return this.reportModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<Report> {
    try {
      return this.reportModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<Report[]> {

    const result = await this.reportModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateReport: ReportDTO): Promise<Report> {
    try {
      return this.reportModel.findByIdAndUpdate({ _id }, updateReport).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<Report> {
    try {
      return this.reportModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
