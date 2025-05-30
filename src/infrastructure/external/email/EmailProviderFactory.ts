import { emailConfig } from "~/config/EmailConfig";
import { EmailProvider } from "~/infrastructure/external/email/EmailProvider";
import { NodeMailerDriver } from "~/infrastructure/external/email/NodeMailerDriver";

export class EmailProviderFactory {
  constructor() {}
  public static build() {
    if (EmailProviderFactory.emailProvider() === "nodemailer") {
      return new EmailProvider(new NodeMailerDriver());
    }
    return new EmailProvider(new NodeMailerDriver());
  }

  public static emailProvider() {
    return emailConfig.provider;
  }
}
