
import { Multer_Enum } from "../../common/enum/multer.enum.js";
import { multerLocal } from "../../common/middleware/multer.js";
import { Router } from "express";
import * as MS from "./message.service.js"
import { validation } from "../../common/middleware/validation.js";
import { createMessageSchema } from "./message.validation.js";
import { authentication } from "../../common/middleware/authentication.js";

const messageRouter = Router({strict:true,caseSensitive:true,mergeParams:true})


messageRouter.post("/",
    multerLocal({
        customPath: "messages",
        customTypes: Multer_Enum.images
    }).array("attachments", 3),
    validation(createMessageSchema),
    MS.createMessage);

messageRouter.get("/",authentication, MS.getMessages);
messageRouter.get("/:id",authentication, MS.getMessageById);
messageRouter.delete("/:id",authentication, MS.deleteMessage);

export default messageRouter