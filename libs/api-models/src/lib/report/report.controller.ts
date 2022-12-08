import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ReportDTO } from '../../dto/report.dto';
import { ReportService } from './report.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

import { of } from 'rxjs';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}


  @Post()
  async create(@Body() createReport: ReportDTO) {
    return this.reportService.create(createReport);
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  // @Get(':id')
  // async findbyId(@Param('id') id: string) {
  //   return this.reportService.findbyId(id);
  // }

  @Get(':id/:value')
  async findbyAny(@Param('id') id: string, @Param('value') value: string) {
    if (
      id === 'state' ||
      id === 'crimeId' ||
      id === 'crimeCategory' ||
      id === 'policy'
    ) {
      return this.reportService.findbyAny(id, value);
    } else {
      throw new NotFoundException("fleid '" + id + "' not found");
    }
  }

  @Patch(':_id')
  async update(@Param('_id') _Id: string, @Body() updated: ReportDTO) {
    return this.reportService.update(_Id, updated);
  }

  @Delete(':_id')
  async delete(@Param('_id') _Id: string) {
    return this.reportService.delete(_Id);
  }

  @Delete()
  async deleteMany(@Body() _id: string[]) {
    return this.reportService.deleteMany(_id);
  }




  @Post('file')
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
      destination:'./document'    ,
      filename: (req, file, cb) => {
        const fileNameSplit = file.originalname.split('.');
        const fileExt = fileNameSplit[fileNameSplit.length - 1];
        const uniqueFilename = Date.now() + Math.round(Math.random() * 1e9);
        cb(null, `${file.originalname.replace(/\./g, "-")}-${uniqueFilename}.${fileExt}`);
      },
    }),
  }))
 async uploadMultiple(@UploadedFiles() files,) {
  console.log(files)
  const names=[]
    files.forEach((file) =>{
    const name = file.originalname.split('.')[0];
    const path = `document/${file.path.split('\\')[1]}`;

   names.push(file.path.split('\\')[1]);
  })
  return names

  }
  @Get('file/:id')
  findFile(@Param('id') id:string,@Res() res ) {
    console.log(id)
  return res.sendFile(join(process.cwd(),'document\\'+id))
  }
}
