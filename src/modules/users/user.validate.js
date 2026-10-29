
import joi from "joi"
import { generalRules } from "../../common/utils/generalRules.js"


//==================signUpSchema==========================
export const signUpSchema = {
    body: joi.object({
        fName: joi.string().alphanum().min(2).max(15).required(),
        lName: joi.string().alphanum().min(2).max(15).required(),
        email: generalRules.email.required(),
        phone: joi.number().required(),
        password: generalRules.password.required(),
        cpassword: joi.string().valid(joi.ref("password")).required(),
        gender: joi.string().valid("male", "female").required(),
        age: joi.number().required(),
        // data:joi.data().less("now"),
    }).required().messages({
        "any.required": "body is empty "
    }),

    // query: joi.object({
    //     flag: joi.boolean().required().falsy(0,"no","n").truthy(1,"yes").sensitive()
    // }).required()


    // =================single========================
    // file: joi.object({
    //     fieldname: joi.string().required(),
    //     originalname: joi.string().required(),
    //     encoding: joi.string().required(),
    //     mimetype: joi.string().required(),
    //     path: joi.string(),
    //     destination: joi.string(),
    //     filename: joi.string(),
    //     size: joi.string().required(),
    // }).required().messages({
    //     "any.required":"file is required"
    // })

    // =================array========================

    //  files:joi.array().items(joi.object({
    //         fieldname: joi.string().required(),
    //         originalname: joi.string().required(),
    //         encoding: joi.string().required(),
    //         mimetype: joi.string().required(),
    //         path: joi.string(),
    //         destination: joi.string(),
    //         filename: joi.string(),
    //         size: joi.string().required(),
    //     }).required().messages({
    //         "any.required":"file is required"
    //     })) 

    // =================fields========================

    files: joi.object({
        attachment: joi.array().items(generalRules.file.required()).required(),
        attachments: joi.array().items(generalRules.file.required()).required()
    }).required()

}

//==================updateProfileSchema==========================
export const updateProfileSchema = {
    body: joi.object({
        fName: joi.string().alphanum().min(2).max(15),
        lName: joi.string().alphanum().min(2).max(15),
        phone: joi.number(),
        gender: joi.string().valid("male", "female"),
        age: joi.number(),
    }).required().messages({
        "any.required": "body is empty "
    })
}



//==================updatePasswordSchema==========================
export const updatePasswordSchema = {
    body: joi.object({
        oldPassword: generalRules.password.required(),
        newPassword: generalRules.password.required(),
        cPassword: joi.string().valid(joi.ref("newPassword")).required(),
    }).required()
}


//==================signInSchema==========================
export const signInSchema = {
    body: joi.object({
        email: generalRules.email.required(),
        password: generalRules.password.required(),
    }).required()
}

//==================confirmEmailSchema==========================
export const confirmEmailSchema = {
    body: joi.object({
        email: joi.string().required(),
        otp: joi.string().pattern(/^[0-9]{6}$/).required(),
    }).required()
}


//==================refreshTokenSchema==========================
export const refreshTokenSchema = {
    headers: generalRules.token.required()
}

//==================ShareProfileSchema==========================
export const ShareProfileSchema = {
    params: joi.object({
        id: generalRules.id.required(),
    }).required()
}


