import { hashSync } from "bcrypt";
import sendEmail, { generate_otp } from "../../common/service/sendEmail.js";
import { confirmEmailTemplate } from "../../common/utils/emailTemplate.js";
import { eventEmitter } from "../../common/utils/events.js";
import userModel from "../../DB/models/user.model.js";
import { getValue, incr, setValue, ttl } from "../../DB/service/redis.service.js";


export const sendEmailOtp = async ({ email, isConfirmed, subject = "confirm email" } = {}) => {

    const isBlocked = await ttl(`otp::block::${email}`);
    if (isBlocked > 0) {
        throw new Error(`you blocked,you can resend otp after ${isBlocked} seconds`);
    };
    if (isBlocked < 0) {
        if (await getValue(`otp::max::${email}`) >= 3) {
            await setValue({
                key: `otp::max::${email}`,
                value: 0,
                ttl: 60 * 5
            })
        }
    };


    const ttlOtp = await ttl(`otp::${email}`);
    if (ttlOtp > 0) {
        throw new Error(`you can resend otp after ${ttlOtp} seconds`);
    };
    const max_otp = await getValue(`otp::max::${email}`)
    if (max_otp >= 3) {
        await setValue({
            key: `otp::block::${email}`,
            value: "1",
            ttl: 60 * 10
        })
        throw new Error(`you have exceeded the maxiam `);
    };
    const user = await userModel.findOne({
        email: email.toLowerCase(),
        isConfirmed: { $exists: isConfirmed }
    })
    if (!user) {
        throw new Error("email not exist or already confirmed");
    }
    const otp = await generate_otp()
    const hashOtp = hashSync(otp, 12)
    await setValue({
        key: `otp::${email}`,
        value: hashOtp,
        ttl: 60 * 20
    })
    eventEmitter.emit("confirm_email",
        async () => {
            await sendEmail({
                to: email,
                subject,
                html: confirmEmailTemplate(otp)
            })
        }
    );
    await incr(`otp::max::${email}`)
}