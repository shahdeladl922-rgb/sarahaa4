export const confirmEmailTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Confirm Your Email</title>
    </head>

    <body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial,sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0"
        style="padding:40px 10px; background-color:#f4f4f7;">
        <tr>
          <td align="center">

            <table width="100%" cellpadding="0" cellspacing="0"
              style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden;">

              <tr>
                <td align="center"
                  style="background-color:#6c3ce9; padding:30px;">
                  <h1 style="color:#ffffff; margin:0; font-size:30px;">
                    Saraha
                  </h1>
                  <p style="color:#eee7ff; margin:10px 0 0;">
                    Email Verification
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:35px 25px; color:#333333;">

                  <h2 style="margin-top:0; color:#222222;">
                    Verify Your Email Address
                  </h2>

                  <p style="font-size:16px; line-height:1.7; color:#555555;">
                    Welcome to Saraha! We're happy to have you with us.
                    Please use the verification code below to confirm
                    your email address.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center"
                        style="background-color:#f5f0ff; border:1px dashed #6c3ce9;
                        border-radius:8px; padding:22px;">

                        <p style="margin:0 0 10px; color:#666666;">
                          Your verification code
                        </p>

                        <h1 style="margin:0; letter-spacing:8px;
                          color:#6c3ce9; font-size:34px;">
                          ${otp}
                        </h1>

                      </td>
                    </tr>
                  </table>

                  <p style="font-size:14px; line-height:1.7; color:#666666; margin-top:25px;">
                    This code will expire in 20 minutes.
                    Please do not share it with anyone.
                  </p>

                  <p style="font-size:14px; line-height:1.7; color:#666666;">
                    If you didn't create a Saraha account, you can ignore
                    this email.
                  </p>

                  <p style="margin-bottom:0; color:#333333;">
                    Best regards,<br />
                    <strong>The Saraha Team</strong>
                  </p>

                </td>
              </tr>

              <tr>
                <td align="center"
                  style="background-color:#f9fafb; padding:20px;
                  color:#999999; font-size:12px;">
                  &copy; 2026 Saraha. All rights reserved.
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;
};