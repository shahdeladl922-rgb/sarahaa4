import { findOne } from "../../DB/service/db.service.js";
import userModel from "../../DB/models/user.model.js";
import jwt from "jsonwebtoken"
import { ttl } from "../../DB/service/redis.service.js";
import { ACCESS_TOKEN_SIGNITURE } from "../../../config/config.service.js";


export const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new Error("token not exist", { cause: 404 });
    }

    const decoded = jwt.verify(authorization, ACCESS_TOKEN_SIGNITURE);
    if (!decoded?.id) {
        throw new Error("Invalid token", { cause: 404 });
    }

    const user = await findOne(
        {
            model: userModel,
            filter: { email: decoded.email.toLowerCase() }
        }
    );

    if (!user) {
        throw new Error("user not exist");
    };
    if (!user?.isConfirmed) {
        throw new Error("user not confirmed yet");
    };



    if (user?.changeCredintialAt?.getTime() > decoded.iat * 1000) {
        throw new Error("token expired must be login again", { cause: 400 });
    };

    // if (await findOne({ model: revokeTokenModel, filter: { tokenId: decoded.jti } })) {
    //     throw new Error("token expired you this device must be login again", { cause: 400 });
    // };

    if (await ttl(`revoke_token:"${user._id}::${decoded.jti}`) > 0) {
        throw new Error("inValid revoke token, you should login again", { cause: 400 });
    }

    req.user = user;
    req.decoded = decoded;

    next();

}