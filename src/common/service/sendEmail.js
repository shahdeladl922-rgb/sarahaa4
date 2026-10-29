import nodemailer from "nodemailer";
import { randomInt } from 'node:crypto';
import { USER_EMAIL,PASS_EMAIL } from './../../../config/config.service.js';


const sendEmail = async ({ to, subject, html, attachments } = {}) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: USER_EMAIL,
            pass: PASS_EMAIL
        }
    })

    const info = await transporter.sendMail({
        from: `"shahd" ${USER_EMAIL}`,
        to,
        subject,
        html: html || "<b>Hello world?</b>",
        attachments: attachments || []
    });
    return info.accepted.length > 0 ? true : false;
}


export const generate_otp = async ()=>{
    return randomInt(100000,1000000).toString();
}

export default sendEmail;