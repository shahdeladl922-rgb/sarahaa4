import { Router } from "express";
import * as US from "./user.service.js"
import { authentication } from "../../common/middleware/authentication.js";
import { authorization } from "../../common/middleware/authorization.js";
import { validation } from "../../common/middleware/validation.js";
import { confirmEmailSchema, refreshTokenSchema, ShareProfileSchema, signInSchema, signUpSchema, updatePasswordSchema, updateProfileSchema } from "./user.validate.js";
import { multerLocal } from "../../common/middleware/multer.js";
const userRouter = Router({caseSensitive:true,strict:true});

userRouter.post("/signup",
  multerLocal({ customPath: "admins", customTypes: ['image/jpeg'] }).fields([
    { name: "attachment", max: 1 },
    { name: "attachments", max: 2 }
  ]), validation(signUpSchema), US.signup);

userRouter.post("/signup/gmail", US.signupWithGmail);
userRouter.post("/login", validation(signInSchema), US.login);
userRouter.post("/refresh-token", validation(refreshTokenSchema), US.refreshToken);
userRouter.get("/profile", authentication, US.getProfile);
userRouter.get("/share-profile/:id", validation(ShareProfileSchema), US.shareProfile);
userRouter.patch("/update-profile", validation(updateProfileSchema), authentication, US.updateProfile);
userRouter.patch("/reSendOtp",  US.reSendOtp);
userRouter.patch("/update-password", validation(updatePasswordSchema), authentication, US.updatePassword);
userRouter.patch("/forget-password", US.forgetPassword);
userRouter.patch("/reset-password", US.resetPassword);
userRouter.patch("/confirm-email", validation(confirmEmailSchema), US.confirmEmail);
userRouter.patch("/logout", authentication, US.logout);

export default userRouter;