
import { createClient } from "redis"
import { RADIS_URI } from "../../config/config.service.js";

export const redis_client = createClient({
  url: RADIS_URI
});


export default async function connectionRedis() {
    try {
        await redis_client.connect();
        console.log("connect Redis successfully.......😍");

    } catch (error) {
        console.log("Redis connected failed.......😒");

    }
}