import { EventEmitter } from "events";


export const eventEmitter = new EventEmitter();

eventEmitter.on("confirm_email", async (fn) => {
    fn()
})