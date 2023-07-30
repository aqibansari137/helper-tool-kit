import mongoose from 'mongoose'

const codeStoreSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const Code = mongoose.model('codeStore', codeStoreSchema)

export default Code;