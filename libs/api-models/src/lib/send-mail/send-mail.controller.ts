import { Body, Controller, Post, Request } from '@nestjs/common';

import { SendMailService } from './send-mail.service';

@Controller('send-mail')
export class SendMailController {

  constructor(private sendMailService: SendMailService) {}
  @Post()
  async sendEmail(@Request() req) {
    const s= await this.sendMailService.sendMail(req.body.email, req.body.name);
    return s
}
}
