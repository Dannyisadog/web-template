import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

interface sendParams {
  template: string;
  subject: string;
  to: string;
}

class Mailer {
  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;

  constructor() {
    this.MAILGUN_API_KEY = process.env.MAILGUN_API_KEY ?? '';
    this.MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN ?? '';
  }

  async send({
    template,
    subject,
    to
  }: sendParams) {
    try {
      if (!this.MAILGUN_API_KEY) {
        throw new Error("MAIL API KEY SHOULD NOT BE EMPTY");
      }
    
      if (!this.MAILGUN_DOMAIN) {
        throw new Error("MAIL DOMAIN SHOULD NOT BE EMPTY");
      }
    
      const auth = {
        auth: {
          api_key: this.MAILGUN_API_KEY,
          domain: this.MAILGUN_DOMAIN
        }
      }
    
      const mailer = nodemailer.createTransport(mg(auth));
    
      await mailer.sendMail({
        from: 'no-reply@template.dannyisadog.com',
        to: to,
        subject: subject,
        html: template
      });
  
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default Mailer;