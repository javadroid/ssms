import { Body, Controller, Post, Request } from '@nestjs/common';

import { SendMailService } from './send-mail.service';

@Controller('send-mail')
export class SendMailController {

  constructor(private sendMailService: SendMailService) {}
  @Post()
  async sendEmail(@Body() req) {
    return  await this.sendMailService.sendMail(req);

}
}
