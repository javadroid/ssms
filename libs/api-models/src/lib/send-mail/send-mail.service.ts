import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class SendMailService {
  constructor(private mailerService: MailerService){}

  async sendMail(email: string, name: string) {
    console.log(email)
    await this.mailerService.sendMail({
        to: email,
        subject: 'Greeting from NestJS NodeMailer',
        html: '<p>Hi {{name}}</p>'+
        '<p>Hello from NestJS NodeMailer</p>',
        context: {
            name: name
        }
    })
}


}
