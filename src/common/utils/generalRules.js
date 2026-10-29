import joi from "joi"
import { Types } from "mongoose"

export const generalRules = {
    id: joi.string().custom((value, helper) => {
        return Types.ObjectId.isValid(value) ? value : helper.message("inValid Id")
    }),
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
    password: joi.string().required(),
    file: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().required(),
        path: joi.string(),
        destination: joi.string(),
        filename: joi.string(),
        size: joi.number().required(),
    }).messages({
        "any.required": "file is required"
    }),

    token: joi.object({
        authorization: joi.string().required(),
        "postman-token": joi.string(),
        "content-type": joi.string(),
        "content-length": joi.string(),
        host: joi.string(),
        "user-agent": joi.string(),
        accept: joi.string(),
        "accept-encoding": joi.string(),
        connection: joi.string(),
    })


}