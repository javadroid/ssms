import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Request } from 'express';
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
  async uploadMultiple(@UploadedFiles() files,@Req() request: Request) {
    console.log(files);
    const names = [];
    files.forEach((file) => {
      const name = file.originalname.split('.')[0];
      const path = `document/${file.path.split('\\')[1]}`;
      const host = request.headers.host;
      const protocol = request.protocol;
      const url = `${protocol}://${host}`;
      console.log("file", file);
      // names.push(
      //   `${url}/api/document/` + file.path.split('\\')[1]
      // );

      names.push(
        `${url}/api/` + path
      );
    });

    console.log("names", names);
    return names;
  }

  @Get(':id')
  findFile(@Param('id') id: string, @Res() res) {
    console.log(id);
    return res.sendFile(join(process.cwd(), 'document\\' + id));
  }
}
