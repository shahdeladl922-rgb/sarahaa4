

export const create = async ({ model, data, options = {} } = {}) => {
    return await model.create([data], options)
}
export const findOne = async ({ model, filter, options = {} } = {}) => {
    return await model.findOne(filter, options)
}
export const find = async ({ model, filter, options = {} } = {}) => {
    const data = model.find(filter)
    if (options?.limit) data.limit(options?.limit);
    if (options?.skip) data.skip(options?.skip);
    if (options?.sort) data.sort(options?.sort);
    if (options?.populate) data.populate(options?.populate);
    return data.exec();
}
export const findById = async ({ model, id, options = {} } = {}) => {
    return await model.findById(id, options)
}
export const findOneAndUpdate = async ({ model, filter, update, options = {} } = {}) => {
    return await model.findOneAndUpdate(filter, update, { new: true, runValidators: true, ...options })
}
export const findByIdAndUpdate = async ({ model, id, update, options = {} } = {}) => {
    return await model.findByIdAndUpdate(id, update, { new: true, runValidators: true, ...options })
}

export const findOneAndDelete = async ({ model, filter } = {}) => {
    return await model.findOneAndDelete(filter)
}

export const deleteOne = async ({ model, filter } = {}) => {
    return await model.deleteOne(filter)
}
export const deleteMany = async ({ model, filter } = {}) => {
    return await model.deleteMany(filter)
}