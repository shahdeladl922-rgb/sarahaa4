import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: function () {
                return this.attachments?.length ? true : false
            },
            trim: true
        },
        attachments: [String],
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }

    },

    {
        timestamps: true,
        strict: true,
        strictQuery: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const messageModel = mongoose.models.message || mongoose.model("message", messageSchema);

export default messageModel;