
import joi from "joi"
import { generalRules } from "../../common/utils/generalRules.js"



export const createMessageSchema = {
    body: joi.object({
        content: joi.string(),
        userId: generalRules.id.required()
    }).required(),

    files: joi.array().items(generalRules.file)
}
