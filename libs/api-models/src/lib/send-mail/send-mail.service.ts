import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class SendMailService {
  constructor(private mailerService: MailerService){}

  async sendMail(body:any) {
    console.log(body.email)
  const res=  await this.mailerService.sendMail({
        to: body.email,
        subject: 'Greeting from NestJS NodeMailer',
        html: `<p>Hi ${body.email} </p>`+
        `<p>Your password is ${body.password}</p>`,
        context: {
            name:  body.name
        }
    })
    console.log( res);
     return res

}


}
