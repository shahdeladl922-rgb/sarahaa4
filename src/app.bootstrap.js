import { ALLOW_ORGINS, PORT } from "../config/config.service.js";
import express from "express";
import connectionDB from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";
import cors from "cors"
import connectionRedis from "./DB/connectionRedis.js";
import messageRouter from "./modules/messages/message.controller.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { success_response } from "./common/utils/success.response.js";


const app = express();
const port = PORT;

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    message: {
        success: false,
        message: "you reach the maximam of requests"
    },
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 400,
    handler: (req, res) => {
        res.status(401).json({
            message: "please try again after 1min"
        })
    }
});







const bootstrap = async () => {

    app.set("case sensitive routing", true);
    app.set("strict routing", true);


    app.use(cors({
        origin: function (origin, callback) {
            if ([...ALLOW_ORGINS, undefined].includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("not allowed by origin"))
            }
        }
    }));
    app.use(limiter);
    app.use(helmet());
    app.use(express.json());

    await connectionDB();
    await connectionRedis();




    app.get("/", (req, res, next) => {
        // res.status(200).json({ message: "welome on sarahaaa app..........😉😍" });
        success_response({
            res,
            statusCode:200,
            message:"welome on sarahaaa app..........😉😍"
        })
    });

    app.use("/users", userRouter);
    app.use("/messages", messageRouter);


    app.use("{/*demo}", (req, res, next) => {
        // // res.status(404).json({
        // //     message: `URL:${req.originalUrl} with METHOD:${req.method} not found`,
        // //     statusCode: 404
        // // }
        // )
        throw new Error(`URL:${req.originalUrl} with METHOD:${req.method} not found`, { cause: 404 });
    });


    app.use((err, req, res, next) => {
        console.log(err);
        res.status(err.casue || 500).json({ error: err.message, stack: err.stack });
    });


    app.listen(port, () => {
        console.log(`SARAHA APP running on server ${port}`);
    })
}


export default bootstrap