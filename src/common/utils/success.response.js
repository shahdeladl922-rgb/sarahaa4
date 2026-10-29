

export const success_response = ({
    res,
    message = "Done",
    statusCode,
    data = undefined
} = {}) => {
    return res.status(statusCode || 200).json({ message, data })
}