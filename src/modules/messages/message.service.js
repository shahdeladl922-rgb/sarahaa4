
import { success_response } from "../../common/utils/success.response.js"
import messageModel from "../../DB/models/message.model.js"
import userModel from "../../DB/models/user.model.js"
import * as dbService from "../../DB/service/db.service.js"

// ============== createMessage ==============
export const createMessage = async (req, res, next) => {

    const { content, userId } = req.body

    if (!content && !req.files.length) throw new Error("content is required")

    const userExist = await dbService.findById({
        model: userModel,
        id: userId
    })
    if (!userExist) throw new Error("user not exist");

    let urls = []
    if (req?.files?.length) {
        for (const file of req?.files) {
            urls.push(file.path)
        }
    }

    const message = await dbService.create({
        model: messageModel,
        data: {
            content,
            attachments: urls,
            userId
        }
    })
    success_response({
        res,
        statusCode: 201,
        message: "Done",
        data: message
    });
    // return res.status(201).json({ message: "Done", message })
}


// ===================getMessages=================
export const getMessages = async (req, res, next) => {

    const messages = await dbService.find({
        model: messageModel,
        filter: { userId: req.user._id }
    });

    success_response({
        res,
        statusCode: 200,
        message: "Done",
        data: messages
    });
    // return res.status(200).json({ message: "done",  messages })
}
// ===================getMessageById=================

export const getMessageById = async (req, res, next) => {

    const message = await dbService.findOne({
        model: messageModel,
        filter: {
            _id: req.params.id,
            userId: req.user._id
        }
    });

    success_response({
        res,
        statusCode: 200,
        message: "Done",
        data: message
    });
    // return res.status(200).json({ message: "done", data: message })
}
// ===================deleteMessage=================

export const deleteMessage = async (req, res, next) => {

    const message = await dbService.deleteOne({
        model: messageModel,
        filter: {
            _id: req.params.id,
            userId: req.user._id
        }
    });

    success_response({
        res,
        statusCode: 200,
        message: "Done",
        data: message
    });
    // return res.status(200).json({ message: "done", data: message })
}