import nodemailer, {Transporter} from "nodemailer";
import {config} from "../configs/config";
import fs from "node:fs/promises";
import * as path from "node:path";
import handlebars from "handlebars";

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASSWORD
            }
        });
    }

    public async sendEmail(
        receiver: string,
        subject: string,
        templateName: string,
        context: Record<string, any>): Promise<void>
    {
        await this.transporter.sendMail({
            to: receiver,
            subject: subject,
            html: await this._readTemplate(templateName, context)
        })
    }

    private async _readTemplate(templateName: string, context: Record<string, any>): Promise<string> {
        const layoutSource = await fs.readFile(path.join(process.cwd(),
            "src", "templates", "base.hbs"), 'utf8');

        const layoutTemplate = handlebars.compile(layoutSource);

        const templateSource = await fs.readFile(path.join(process.cwd(),
            "src", "templates", `${templateName}.hbs`), 'utf8');

        const childTemplate = handlebars.compile(templateSource);

        const childHtml = childTemplate(context);
        return layoutTemplate({...context, body: childHtml});
    }
}

export const emailService = new EmailService();
