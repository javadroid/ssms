import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('document')
export class FileuploadController {
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: './document',
        filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          const uniqueFilename = Date.now() + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.originalname.replace(
              /\./g,
              '-'
            )}-${uniqueFilename}.${fileExt}`
          );
        },
      }),
    })
  )
  async uploadMultiple(@UploadedFiles() files) {
    console.log(files);
    const names = [];
    files.forEach((file) => {
      const name = file.originalname.split('.')[0];
      const path = `document/${file.path.split('\\')[1]}`;

      names.push(
        `${process.env['NX_API_URL']}/document/` + file.path.split('\\')[1]
      );
    });
    return names;
  }

  @Get(':id')
  findFile(@Param('id') id: string, @Res() res) {
    console.log(id);
    return res.sendFile(join(process.cwd(), 'document\\' + id));
  }
}
